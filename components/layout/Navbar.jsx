"use client";

import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";
import { useState } from "react";

import NavMobile from "./NavMobile";
import { IoMdMenu } from "react-icons/io";

export default function Navbar() {
  const t = useTranslations("nav");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      {/* container */}
      <div className="container w-11/12 mx-auto flex items-center justify-between py-4">
        {/* logo */}

        <Link href="/" className="text-3xl font-bold flex-1">
          Nordern <span className="font-bold text-purple-700">.</span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center flex-2 justify-between">
          {/* links */}
          <div>
            <Link
              className="mx-4 opacity-75 hover:opacity-100 transition-all duration-150 "
              href={"#services"}
            >
              {t("services")}
            </Link>
            <Link
              className="mx-4 opacity-75 hover:opacity-100 transition-all duration-150 "
              href={"#work"}
            >
              {t("work")}
            </Link>
            <Link
              className="mx-4 opacity-75 hover:opacity-100 transition-all duration-150 "
              href={"#about"}
            >
              {t("whyChooseUs")}
            </Link>
            <Link
              className="mx-4 opacity-75 hover:opacity-100 transition-all duration-150 "
              href={"#contact"}
            >
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center justify-center gap-7 w-1/2">
            {/* start new project btn */}
            <Link
              href={"#contact"}
              className="bg-white w-full text-center text-gray-800 font-bold border-blue-800 hover:scale-105 rounded-full px-10 py-2 hover:bg-gray-200 transition-all"
            >
              {t("startProject")}
            </Link>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>

        {/* icons for open menu */}
        <div className="md:hidden">
          <IoMdMenu size={30} className="opacity-75 transition-all duration-200 cursor-pointer hover:scale-105 hover:opacity-100 " onClick={() => setIsOpen(true)} />
        </div>
        {/* show nav for mobile  */}
        <div className="md:hidden">
          <NavMobile isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </nav>
  );
}
