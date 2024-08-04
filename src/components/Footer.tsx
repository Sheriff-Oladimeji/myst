import React from "react";
import Link from "next/link";
import { footerItems } from "@/data/navigation";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 z-20 w-full p-4  border-t border-gray-200 shadow flex items-center justify-between md:p-6">
      <span className="text-base text-gray-400 sm:text-center">
        © 2023{" "}
        <a href="/" className="hover:underline">
          Myst
        </a>
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
        {footerItems.map((item) => (
          <li key={item.id} className="mr-6">
            <Link href={item.url}>
              <item.icon size={25} />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
