"use server"
import { Category, PrismaClient, User } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()


export const getData = async (uid: number) => {
  
  const userData = await prisma.user.findUnique({
    where: {
      id: uid,
    },
    include: {
      selectedCategories: true,
    },
  });
  const categories = await prisma.category.findMany();

  await prisma.$disconnect()
  return {
    selected:userData?.selectedCategories ||[] ,
    categories
  }
  
};

export const addCategories=async ()=>{
  const arr=new Set<string>()
  let song
  for( let i=0;i<100;i++){
    do{
      song=faker.music.songName()
    }while(arr.has(song))
    arr.add(song)
  }
  console.log(arr)

  for (const category of Array.from(arr, item => ({ name: item }))) {
    await prisma.category.create({
      data: {
        name: category.name,
      },
    });
}}


export const updateCategory=async (uid:number,updatedCategories:Category[])=>{
  
      // Update user's selected categories in the database
      await prisma.user.update({
        where: {
          id: uid,
        },
        data: {
          selectedCategories: {
            set: updatedCategories.map((category) => ({
              id: category.id,
            })),
          },
        },
      });
      await prisma.$disconnect()
}
