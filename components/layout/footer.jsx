import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { LuGithub } from "react-icons/lu";
export default function Footer() {
  const t = useTranslations("footer");
  return (
    <div className="w-full py-12 px-8  bg-black border-white/50 text-white text-center">
      <div className="container w-full relative mx-auto flex flex-col justify-around items-start">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-25 bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 w-full">
          <div className="flex flex-col flex-2 items-start justify-start">
            <Link href="/" className="mb-10 text-4xl font-bold">
              Nordern <span className="font-bold text-purple-700">.</span>
            </Link>
            <p className="w-11/12 text-xl text-start  text-gray-500 leading-8">
              {t("messageForClient")}
            </p>
          </div>

          {/* quick links */}
          <div className="flex flex-1 flex-col md:items-center md:justify-start items-start">
            <h3 className="text-2xl font-bold mb-10">{t("quickLinks")}</h3>
            <Link
              className="text-xl opacity-75 hover:opacity-100 transition-all duration-150 my-2"
              href={"#services"}
            >
              {t("services")}
            </Link>
            <Link
              className="text-xl opacity-75 hover:opacity-100 transition-all duration-150 my-2"
              href={"#work"}
            >
              {t("work")}
            </Link>
            <Link
              className="text-xl opacity-75 hover:opacity-100 transition-all duration-150 my-2"
              href={"#whyChooseUs"}
            >
              {t("whyChooseUs")}
            </Link>
            <Link
              className="text-xl opacity-75 hover:opacity-100 transition-all duration-150 my-2"
              href={"#contact"}
            >
              {t("contact")}
            </Link>
          </div>

          {/* links for social media */}
          <div className="flex flex-col flex-1 md:items-center md:justify-start items-start">
            <h3 className="text-3xl font-bold mb-10">{t("connect")}</h3>
            <div className="flex items-center gap-5 justify-center">
              <Link
                className="rounded-full border-gray-600 border-2 p-3 bg-gray-900/60 hover:bg-gray-900"
                href={"#"}
                target="_blank"
              >
                <IoLogoInstagram size={24} />
              </Link>
              <Link
                className="rounded-full border-gray-600 border-2 p-3 bg-gray-900/60 hover:bg-gray-900"
                href={"#"}
                target="_blank"
              >
                <LuGithub size={24} />
              </Link>
              <Link
                className="rounded-full border-gray-600 border-2 p-3 bg-gray-900/60 hover:bg-gray-900"
                href={"#"}
                target="_blank"
              >
                <FaFacebookF size={24} />
              </Link>
              <Link
                className="rounded-full border-gray-600 border-2 p-3 bg-gray-900/60 hover:bg-gray-900"
                href={"#"}
                target="_blank"
              >
                <FaLinkedinIn size={24} />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white/50 h-px w-full my-10"></div>

        {/* bottom part from footer */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-center justify-between w-full">
          <p className="text-gray-500 text-xl font-light">
            &copy; {new Date().getFullYear()} Nordern. All rights reserved.
          </p>
          <div className="flex gap-7">
            <Link href="#" className="text-gray-500 text-xl font-light hover:text-white transition-all duration-150 mr-8 ">
              {t("privacyPolicy")}
            </Link>
            <Link href="#" className="text-gray-500 text-xl font-light hover:text-white transition-all duration-150">
              {t("termsOfService")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
