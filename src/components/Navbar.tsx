"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMenu, IoSearch } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";
import useSearchStore from "@/store/searchStore";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { value, setValue } = useSearchStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const path = usePathname();
  const [searchInput , setSearchInput ] = useState<string>("")
  const router = useRouter();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleSearch = () => {
    if (searchInput) {
      setValue(searchInput)
      router.push("/search")
    }
  }

  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-500 dark:border-gray-600 bg-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Qlip
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 rtl:space-x-reverse">
          
          <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-64 bg-gray-700 text-white rounded-md focus:outline-none"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="text-white" onClick={handleSearch}>
              <IoSearch size={25} />
            </button>
          </div>

        
          <Link href="/new-quote">
            <button
              type="button"
              className="ml-3 text-white bg-blue-700 focus:outline-none font-medium text-sm px-4 py-2 text-center rounded-[6px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Add Quote
            </button>
          </Link>

          
          <button onClick={toggleMobileMenu} className="block md:hidden">
            <IoMenu size={35} />
          </button>
        </div>

      
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:p-0 mt-4 font-medium rounded-lg gap-4 md:gap-8 rtl:space-x-reverse md:flex-row md:mt-0 bg-black">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className={`block p-2 text-gray-100 rounded md:hover:text-blue-700 md:hover:bg-transparent md:p-0 ${
                  path == item.url
                    ? "bg-blue-700 md:bg-transparent md:text-blue-700"
                    : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}

           
            <li className="block md:hidden">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <input
                  type="text"
                  placeholder="Search..."
                  className="px-4 py-2 w-full bg-gray-700 text-white rounded-md focus:outline-none"
                />
                <button className="text-white">
                  <IoSearch size={25} />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
