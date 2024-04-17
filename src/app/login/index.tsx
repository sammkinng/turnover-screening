"use client";
import React, { useState } from "react";
import { Text, Button, Input, Heading } from "../../components";
import Header from "../../components/Header";
import Link from "next/link";
import { signIn } from "../utils/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()
  return (
    <>
      {/* login page section */}
      <div className="flex w-full flex-col gap-10 bg-white-A700">
        {/* header section */}
        <Header />

        {/* login form section */}
        <div className="flex flex-col items-center gap-[110px] md:gap-[82px] sm:gap-[55px]">
          <div className="flex w-[40%] flex-col items-center rounded-[20px] border border-solid border-gray-400 bg-white-A700 p-[42px] md:w-full md:p-5">
            <Link href="Login" target="_blank" rel="noreferrer">
              <Heading size="s" as="h1">
                Login
              </Heading>
            </Link>
            <Text size="xl" as="p" className="mt-8">
              Welcome back to ECOMMERCE
            </Text>
            <div className="mb-2 mt-[13px] flex w-[93%] flex-col items-center md:w-full">
              <Text as="p">The next gen business marketplace</Text>
              <div className="mt-7 flex flex-col items-start gap-1.5 self-stretch">
                <Text as="p">Email</Text>
                <Input shape="round" name="email" placeholder={`Enter`} className="sm:pr-5" onChange={(e: any) => setMail(e)} />
              </div>
              <div className="mt-[31px] flex flex-col items-start gap-1.5 self-stretch">
                <Text as="p">Password</Text>
                <Input shape="round" type="password" name="password" placeholder={`Enter`} className="gap-[35px]" onChange={(e: any) => setPassword(e)} />
              </div>
              {error && <p className="text-red-800">{error}</p>}
              <Button
                shape="round"
                onClick={() => {
                  if (password && mail) {
                    signIn({
                      email: mail, password
                    })
                      .then((user) => {
                        router.replace('/')
                        localStorage.setItem('user', JSON.stringify(user.id));
                      })
                      .catch((e) => {
                        setError(e.message)
                        setTimeout(() => setError(""), 3000)
                      })
                  }
                  else {
                    setError("All fields are required")
                    setTimeout(() => setError(""), 2000)
                  }
                }}
                className="mt-10 w-full border border-solid border-black-900 font-medium uppercase tracking-[1.12px] sm:px-5 text-white-A700"
              >
                Login
              </Button>
              <div className="mt-[29px] h-px w-full self-stretch bg-gray-400" />
              <div className="ml-[85px] mt-[30px] flex flex-wrap gap-2.5 self-start md:ml-0">
                <Text as="p" className="!text-blue_gray-900">
                  Don’t have an Account?{" "}
                </Text>
                <Link href="/signup">
                  <Text as="p" className="!font-medium uppercase tracking-[1.12px]">
                    Sign up
                  </Text>
                </Link>
              </div>
            </div>
          </div>


        </div>
      </div>
    </>
  );
}
