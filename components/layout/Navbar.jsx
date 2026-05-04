"use client"
import { useTranslations } from "next-intl";
import LanguageSwitcher from "../LanguageSwitcher";
import Link from "next/link";
import NavMobile from "./NavMobile";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
export default function Navbar() {
  const t = useTranslations("nav");
  const [isNavOpen, setIsNavOpen] = useState(false);

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
            <Link className="mx-4 opacity-75 hover:opacity-100 transition-all duration-150 " href={"#services"}>{t("services")}</Link>
            <Link className="mx-4 opacity-75 hover:opacity-100 transition-all duration-150 " href={"#work"}>{t("work")}</Link>
            <Link className="mx-4 opacity-75 hover:opacity-100 transition-all duration-150 " href={"#whyChooseUs"}>{t("whyChooseUs")}</Link>
            <Link className="mx-4 opacity-75 hover:opacity-100 transition-all duration-150 " href={"#contact"}>{t("contact")}</Link>
          </div>

          {/* start new project btn */}
          <Link
            href={"#contact"}
            className="bg-white text-gray-800 font-bold border-blue-800 hover:scale-105   rounded-full px-4 py-2 hover:bg-gray-200 transition-all"
          >
            {t("startProject")}
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>

        {/* menu icon */}
        <div className="md:hidden hover:scale-105 transition-all cursor-pointer opacity-75 hover:opacity-100">
          <IoMenu size={30} className="opacity-75 hover:opacity-100 hover:scale-105 duration-200 transition-all" onClick={() => setIsNavOpen(!isNavOpen)} />
        </div>
          <NavMobile isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
      </div>
    </nav>
  );
}
