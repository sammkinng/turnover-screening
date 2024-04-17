"use client";
import React, { useState } from "react";
import { Text, Button, Input, Heading } from "../../components";
import Header from "../../components/Header";
import Link from "next/link";
import { signUp } from "../utils/auth";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router=useRouter()
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [mailErr, setMailErr] = useState(false)
  const [pwErr, setPwErr] = useState(false)
  return (
    <>
      {/* signup page section */}
      <div className="flex w-full flex-col gap-10 border-b border-dashed border-red-500_19 bg-white-A700">
        {/* header section */}
        <Header />

        {/* signup form section */}
        <div className="flex flex-col items-center gap-[9637px] md:gap-[7227px] sm:gap-[4818px]">
          <div className="flex w-[40%] flex-col items-center gap-7 rounded-[20px] border border-solid border-gray-400 bg-white-A700 p-[42px] md:w-full md:p-5">
            <Heading size="s" as="h1">
              Create your account
            </Heading>
            <div className="mb-[87px] flex w-[93%] flex-col items-center md:w-full">
              <div className="self-stretch">
                <div className="flex flex-col items-start gap-1.5">
                  <Text as="p">Name</Text>
                  <Input shape="round" required name="name" placeholder={`Enter`} className="sm:pr-5" onChange={(val: any) => setName(val)} />
                </div>

              </div>
              <div className="mt-[31px] flex flex-col items-start gap-1.5 self-stretch">
                <Text as="p">Email</Text>
                <Input shape="round" name="email" required placeholder={`Enter`} className="sm:pr-5" onChange={(e: any) => {
                  setMail(e)
                  if (!/^\S+@\S+\.\S+$/.test(e)) {
                    setMailErr(true);
                  } else {
                    setMailErr(false);
                  }
                }} />
                {mailErr && <p className="text-red-800">Inavalid mail address</p>}
              </div>
              <div className="mt-[31px] flex flex-col items-start gap-1.5 self-stretch">
                <Text as="p">Password</Text>
                <Input shape="round" type="password" required name="password" placeholder={`Enter`} className="sm:pr-5" onChange={(e: any) => {
                  setPassword(e)
                  if (e.length < 8) {
                    setPwErr(true);
                  } else {
                    setPwErr(false);
                  }
                }} />
                {pwErr && <p className="text-red-800">Weak Password</p>}
              </div>
              {error && <p className="text-red-800 mt-2">{error}</p>}
              <Button
                shape="round" onClick={() => {
                  if (name && password && mail) {
                    if (!pwErr && !mailErr) {

                      signUp({
                        username: name, email: mail, password
                      })
                        .then((user) => {
                          router.push('/otp')
                          localStorage.setItem('user', JSON.stringify(user.id));
                        })
                        .catch((e) => {
                          console.log(e)
                          setError(e)
                          setTimeout(() => setError(""), 3000)
                        })
                    } else {
                      setError("Please fix all the errors")
                      setTimeout(() => setError(""), 2000)
                    }
                  }
                  else {
                    setError("All fields are required")
                    setTimeout(() => setError(""), 2000)
                  }

                }}
                className="mt-10 w-full border border-solid border-black-900 font-medium uppercase tracking-[1.12px] sm:px-5 text-white-A700"
              >
                Create account
              </Button>
              <div className="mt-[47px] flex flex-wrap gap-[11px]">
                <Text as="p" className="!text-blue_gray-900">
                  Have an Account?{" "}
                </Text>
                <Link href="/login" target="_blank" rel="noreferrer">
                  <Text as="p" className="!font-medium uppercase tracking-[1.12px]">
                    Login
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
