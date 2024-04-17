"use client";
import React, { useRef, useState } from "react";
import { Button, Text, Heading } from "../../components";
import Header from "../../components/Header";
import { useRouter } from "next/navigation";


export default function SignUpOnePage() {
  const [err, setErr] = useState(false)
  const router = useRouter()
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Ensure input is a number
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to next input
      if (value !== '' && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent typing more than 1 digit
    if (event.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };


  return (
    <div className="flex w-full flex-col gap-10 border-b border-dashed border-red-500_19 bg-white-A700">
      {/* header section */}
      <Header />

      {/* verification section */}
      <div className="flex flex-col items-center gap-[9875px] md:gap-[7406px] sm:gap-[4937px]">
        <div className="flex w-[40%] flex-col items-center rounded-[20px] border border-solid border-gray-400 bg-white-A700 p-[42px] md:w-full md:p-5">
          <Heading size="s" as="h1">
            Verify your email
          </Heading>
          <Text as="p" className="mt-[29px] w-[68%] text-center md:w-full">
            <span className="text-black-900">
              <>
                Enter the 8 digit code you have received on your mail address<br />
              </>
            </span>
            </Text>
          <div className="mt-[45px] flex w-[92%] flex-col items-start gap-1.5 md:w-full">
            <Text as="p">Code</Text>
            <div className="flex gap-3 self-stretch sm:flex-col">
              {otp.map((value, index) => (
                <input
                  className="h-[48px] w-[46px] rounded-md border border-solid border-gray-400 bg-white-A700 text-center"
                  key={index}

                  maxLength={1}
                  value={value}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyPress={(e) => handleKeyPress(index, e)}
                  ref={(el) => { if (el) inputRefs.current[index] = el }}
                />
              ))}
            </div>
          </div>
          {err && <p className="text-red-800 mt-2">OTP mismatched</p>}
          <Button
            onClick={() => {
              const enteredOtp = otp.join('');

              // Compare entered OTP with sent OTP
              if (enteredOtp === '12345678') {
                console.log('OTP Matched!');
                router.replace('/')
                // Perform action on successful OTP verification
              } else {
                console.log('OTP Mismatch!');

                setErr(true)
                setTimeout(() => setErr(false), 2000)
              }
            }}
            shape="round"
            className="mb-[17px] text-white-A700 mt-16 min-w-[456px] border border-solid border-black-900 font-medium uppercase tracking-[1.12px] sm:px-5"
          >
            Verify
          </Button>
        </div>

      </div>
    </div>
  );
}
