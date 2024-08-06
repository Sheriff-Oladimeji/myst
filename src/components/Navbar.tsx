"use client";
import React, { useState } from "react";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const path = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 bg-black">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Myst
          </span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Link href="/new-quote">
            <button
              type="button"
              className="text-white bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 text-center rounded-[6px] "
            >
              Add Quote
            </button>
          </Link>

          <button onClick={toggleMobileMenu} className={`block md:hidden`}>
            <IoMenu size={35} />
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMobileMenuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col  md:p-0 mt-4 font-medium  rounded-lg gap-4  md:gap-8 rtl:space-x-reverse md:flex-row md:mt-0  bg-black">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.url}
                className={`block p-2 text-gray-100 rounded md:hover:text-blue-700 md:hover:bg-transparent md:p-0  ${
                  path == item.url ? "bg-blue-700 md:bg-transparent" : ""
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
