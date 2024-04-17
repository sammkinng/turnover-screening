"use server"
import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

interface SignUpData {
  username: string;
  email: string;
  password: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export const getSession = async (id:number): Promise<User | null> => {
  // Check if user is authenticated
  if (id!=0) {
    const user = await prisma.user.findUnique({
      where: {
        id
      },
    });
    await prisma.$disconnect()
    return user;
  }
  await prisma.$disconnect()
  return null;
};

export const signUp = async (userData: SignUpData): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      },
    });
    await prisma.$disconnect()
    return user;
  } catch (error) {
    await prisma.$disconnect()
    throw new Error('Unable to sign up');
  }
};

export const signIn = async (credentials: SignInCredentials): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const passwordMatch = await bcrypt.compare(credentials.password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid email or password');
  }
  await prisma.$disconnect()
  return user;
};
