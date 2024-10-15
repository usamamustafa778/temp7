import { Menu, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { sanitizeUrl } from "@/lib/myFun";


export default function Navbar({
  logo,
  categories,
  imagePath,
  handleSearchToggle,
  handleSearchChange,
  filteredBlogs,
  searchQuery,
  openSearch,
}) {
  const [sidebar, setSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = (state) => {
    setIsDropdownOpen(state);
  };

  return (
    <>
      <div className="mx-auto max-w-[1500px]">
        <div className="p-10 border-b">
          <Logo logo={logo} imagePath={imagePath} />
        </div>

        <div className="flex items-center justify-between gap-3 relative mx-auto border-b-2 border-black pb-6 max-w-[1500px]">
          <Menu onClick={() => setSidebar(true)} className="cursor-pointer w-8" />
          
          {/* Main Nav Links */}
          <div className="hidden lg:flex space-x-4 lg:space-x-9">
            <Link href="/">Home</Link>

            {/* Categories Link */}
            <div
              className="relative group"
              onMouseEnter={() => toggleDropdown(true)}
              onMouseLeave={() => toggleDropdown(false)}
            >
              <Link href="" className="hover:text-black">
                Categories
              </Link>

              {/* Categories Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full  bg-white shadow-lg rounded-md z-50 p-4 w-[300px] grid grid-cols-1 gap-4">
                  {categories.map(( category, index) => (
                    <Link key={index}
                     
                    href={`/${encodeURI(sanitizeUrl(category.title))}`}
                     
                     >
                      <div className="flex items-center gap-4 hover:bg-gray-100 p-2 transition">
                        <Image
                          src={`${imagePath}/${category.image}`}
                          alt={category.title}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                        <span className="font-semibold">{category.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="">Features</Link>
            <Link href="">Contacts</Link>
          </div>

          {/* Search Section */}
          {openSearch ? (
            <>
              {searchQuery && (
                <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                  {filteredBlogs?.map((item, index) => (
                    <Link
                      key={index}
                      title={item.title}
                      href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(item?.title)}`}
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

      {/* Sidebar for Mobile */}
      <div
        className={`sidebar fixed top-0 left-0 h-screen flex flex-col justify-between bg-black text-white z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-ml-96"
        }`}
      >
        <div>
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image height={70} width={140} src={logo} alt="logo" className="mt-1" />
            </Link>
            <X className="w-8 text-white cursor-pointer" onClick={() => setSidebar(false)} />
          </div>

          {/* Sidebar Menu Links */}
          <div className="flex lg:hidden text-2xl flex-col gap-6 mt-16">
            <Link href="/">Home</Link>
            <Link href="#">Features</Link>
            <Link href="#">Contacts</Link>
          </div>
        </div>
        <div>
          <p className="text-normal">© 2024 Chronicle. All Rights Reserved.</p>
        </div>
      </div>

      {/* Sidebar Styles */}
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
