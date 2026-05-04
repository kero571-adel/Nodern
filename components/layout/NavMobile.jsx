import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import { IoMdClose } from "react-icons/io";
import { useTranslations } from "next-intl";

export default function NavMobile({ isOpen, setIsOpen }) {
  
  const t = useTranslations("nav");

  return (
    <>
      {/* navigation for mobile */}
      <div
        className={`md:hidden flex flex-col bg-black/40 backdrop-blur-2xl h-screen fixed top-0 right-0 w-1/2 z-50 p-8 ${isOpen ? "translate-x-0" : "translate-x-full"} transition-all duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center w-full mb-10">
          {/* logo */}
          <Link href="/" className="text-3xl font-bold flex-1">
            Nordern <span className="font-bold text-purple-700">.</span>
          </Link>
          {/* menu icon */}
          <IoMdClose
          onClick={() => setIsOpen(false)}
            size={30}
            className="hover:scale-105 hover:text-blue-800 duration-150 transition-all cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-5 mb-10">
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
        <div className="flex items-center flex-col justify-center gap-7 w-full">
          {/* start new project btn */}
          <Link
            href={"#contact"}
            className="bg-white w-full text-center text-gray-800 font-bold border-blue-800 hover:scale-105 rounded-full px-10 py-2 hover:bg-gray-200 transition-all"
          >
            {t("startProject")}
          </Link>

          {/* Language Switcher */}
          <LanguageSwitcher className="w-full" />
        </div>
      </div>
    </>
  );
}
