import { cn } from "@/lib/utils";
import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";

export default function Navbar({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  searchContainerRef,
  imagePath,
  handleSearchToggle,
  handleSearchChange,
  toggleSidebar,
  openSearch,
  category,
  searchQuery,
}) {
  const navLink =
    "font-semibold capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all p-3";
  const [sidebar, setSidebar] = useState(false);
  const menuList = [
    "Home",
    "Feauture",
    "Categories",
   "Contacts"
  ];
  return (
    <>
      <div className=" mx-auto max-w-[1500px] ">
        <div className="p-10 border-b">
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div
        className="flex items-center justify-between gap-3 relative mx-auto border-b-2 border-black pb-6  max-w-[1500px] "
          ref={searchContainerRef}
        >
          <Menu
            onClick={() => setSidebar(true)}
            className="cursor-pointer w-8"
          />
          <div className=" hidden  lg:flex  space-x-4 lg:space-x-9 ">
            <Link href="/">Home</Link>
            <Link href="#"></Link>
            <Link href="#">Categories</Link>
            <Link href="#">Feautures</Link>
            <Link href="#">Contacts</Link>
          </div>

          {openSearch ? (
            <>
              {searchQuery && (
                <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                  {filteredBlogs?.map((item, index) => (
                    <Link
                      key={index}
                      title={item.title}
                      href={`/${sanitizeUrl(
                        item.article_category
                      )}/${sanitizeUrl(item?.title)}`}
                    >
                      <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                        {item.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
                placeholder="Search..."
              />
            </>
          ) : (
            <button
              className="flex items-center gap-1 hover:bg-black hover:text-white transition-all rounded-md font-semibold p-2"
              onClick={handleSearchToggle}
            >
              <Search className="w-5 md:w-4 cursor-pointer" />
              Search
            </button>
          )}

        
        </div>
      </div>

      <div
        className={`sidebar fixed top-0 left-0 h-screen flex flex-col justify-between bg-black text-white z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-ml-96"
        }`}
      >
        <div>
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                height={70}
                width={140}
                src={logo}
                alt="logo"
                className="mt-1"
              />
            </Link>
            <X
              className="w-8 text-white cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>

          <div className="   flex lg:hidden  items-center gap-3 font-normal mr-5 mt-8 w-full">
            <Search className="w-7" />
            <input
              className="bg-transparent border-b border-white/50 pb-1 outline-none flex-1"
              placeholder="Search..."
            />
          </div>

          <p className=" text-sm mt-10   border-b ">
          Magazine & Blog WordPress Theme
          </p>
          <div className="  flex lg:hidden text-2xl  flex-col gap-6 mt-16">
            {menuList.map((item, index) => (
              <div
                className="uppercase font-bold cursor-pointer hover:opacity-70 transition-all"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-normal  ">© 2024 Chronicle. All Rights Reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 0;
          transition: width 0.3s ease;
        }

        .sidebar.open {
          width: 300px;
        }
        @media only screen and (max-width: 600px) {
          .sidebar.open {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
