import React from "react";
import { Img, Text, Heading } from "./..";
import Link from "next/link";

interface Props {
  className?: string;
}

export default function Header({ ...props }: Props) {
  return (
    <header {...props}>
      <div className="flex flex-col items-center gap-1.5 self-stretch bg-white-A700 pb-4">
        <div className="flex justify-end self-stretch bg-white-A700 p-[9px]">
          <div className="mr-[31px] flex gap-5 self-end pl-3.5 md:mr-0">
            <div className="flex pr-px pt-px">
              <Text size="xs" as="p" className="!text-blue_gray-900">
                Help
              </Text>
            </div>
            <div className="flex">
              <Text size="xs" as="p" className="!text-blue_gray-900">
                Orders & Returns
              </Text>
            </div>
            <div className="flex pl-px pt-px">
              <Text size="xs" as="p" className="self-end text-right !text-blue_gray-900">
                Hi, John
              </Text>
            </div>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-[1360px] items-start justify-between gap-5 md:flex-col md:p-5">
          <div className="mb-0.5 flex w-[69%] items-center justify-between gap-5 md:w-full md:flex-col">
            <Heading size="s" as="h2" className="!font-bold">
              ECOMMERCE
            </Heading>
            <ul className="mb-0.5 flex flex-wrap gap-8 self-end">
              <li>
                <Link href="#" className="self-end">
                  <Heading as="h6">Categories</Heading>
                </Link>
              </li>
              <li>
                <Link href="#" className="self-start">
                  <Heading as="h6">Sale</Heading>
                </Link>
              </li>
              <li>
                <Link href="#" className="self-start">
                  <Heading as="h6">Clearance</Heading>
                </Link>
              </li>
              <li>
                <Link href="#" className="self-start">
                  <Heading as="h6">New stock</Heading>
                </Link>
              </li>
              <li>
                <Link href="#" className="self-end">
                  <Heading as="h6">Trending</Heading>
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex w-[7%] justify-between gap-5 md:w-full">
            <Img src="img_search.svg" width={32} height={32} alt="search_one" className="h-[32px] w-[32px]" />
            <Img src="img_cart.svg" width={32} height={32} alt="cart_one" className="h-[32px] w-[32px]" />
          </div>
        </div>
      </div>
      <div className="flex justify-center self-stretch bg-gray-100 p-1.5">
        <div className="flex w-[20%] flex-wrap items-center justify-between gap-5 self-end md:w-full">
          <Img
            src="img_arrow_left.svg"
            width={16}
            height={16}
            alt="arrowleft_one"
            className="h-[16px] w-[16px] self-start"
          />
          <Text size="s" as="p" className="self-end">
            Get 10% off on business sign up
          </Text>
          <Img
            src="img_arrow_right.svg"
            width={16}
            height={16}
            alt="arrowright_one"
            className="h-[16px] w-[16px] self-start"
          />
        </div>
      </div>
    </header>
  );
}
