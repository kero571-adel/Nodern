import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("nav");
  return (
    <>
      <Hero />
    </>
  );
}
