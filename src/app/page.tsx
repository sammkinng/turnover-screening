"use client"
import React, { useEffect, useState } from "react";
import { Text, CheckBox, Heading } from "../components";
import Header from "../components/Header";

import { useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { getData, updateCategory } from "./utils/api";
import ReactPaginate from "react-paginate";


const ProtectedpagePage: React.FC<{ user: number, categories: Category[], selectedCategories: Category[] }> = ({ user, categories, selectedCategories }) => {
  const [selectedCategoriess, setSelectedCategories] = useState<Category[]>(selectedCategories)
  const [itemOffset, setItemOffset] = useState(0);


  const endOffset = itemOffset + 6;

  const currentItems = categories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(categories.length / 6);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * 6) % categories.length;
    setItemOffset(newOffset);
  };
  useEffect(() => {
    setSelectedCategories(selectedCategories)
  }, [user, categories, selectedCategories])
  return (
    <div className="flex w-full flex-col gap-[78px] border-b border-dashed border-red-500_19 bg-white-A700 md:gap-[58px] sm:gap-[39px]">
      {/* header section */}
      <Header />

      {/* interests section */}
      <div className="flex flex-col items-end gap-[9632px] md:gap-[7224px] sm:gap-[4816px]">
        <div className="mr-[347px] flex w-[53%] flex-col items-start rounded-[20px] border border-solid border-gray-400 bg-white-A700 p-[42px] md:mr-0 md:w-full md:p-5">
          <Heading size="s" as="h1" className="self-center text-center">
            Please mark your interests!
          </Heading>
          <Text as="p" className="mt-6 self-center">
            We will keep you notified.
          </Text>
          <Text size="lg" as="p" className="ml-[17px] mt-10 md:ml-0">
            My saved interests!
          </Text>
          <ul>
            {currentItems.map((category) => {

              return <li key={category.id}>
                <label>
                  <CheckBox
                    name={category.name}
                    label={category.name}
                    id={category + '_id'}
                    className="ml-[17px] mt-[27px] gap-3 p-px text-left text-base text-black-900 md:ml-0"
                    checked={selectedCategoriess.some((c) => c.id === category.id)}
                    // checked={true}
                    onChange={() => {
                      const isChecked = selectedCategoriess.some((category1) => category1.id === category.id);
                      let updatedCategories: any[];

                      if (isChecked) {
                        // Remove category if already selected
                        updatedCategories = selectedCategoriess.filter((category1) => category1.id !== category.id);
                      } else {
                        // Add category if not selected
                        updatedCategories = [...selectedCategoriess, category];
                      }
                      setSelectedCategories(updatedCategories)
                      updateCategory(user, updatedCategories)
                        .catch(e => console.log(e))
                    }}
                  />
                </label>
              </li>
            })}
          </ul>



          <Text size="lg" as="p" className="mb-[30px] ml-[17px] mt-[67px] !text-gray-500 md:ml-0">
            {/* <span className="text-gray-500">&lt;&lt; &lt; 1 2 3 &nbsp;</span>
            <span className="text-black-900">4 5 6 7 ... &gt; &gt;&gt;</span> */}
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              className="flex flex-row gap-2"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              activeClassName="text-black-900"
              previousClassName="text-black-900"
              nextClassName="text-black-900"
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </Text>
        </div>

      </div>
    </div>
  );
}

const ProtectedPage: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  useEffect(() => {
    const fxn = async () => {
      const uid = parseInt(localStorage.getItem('user') || '0')
      if (uid === 0) {
        router.replace('login')
      }
      else {
        const data = await getData(uid)
        setUser(uid)
        setCategories(data.categories)
        setSelectedCategories(data.selected)
      }
    }
    fxn()


  }, [])
  return <ProtectedpagePage user={user} categories={categories} selectedCategories={selectedCategories} />
}


export default ProtectedPage