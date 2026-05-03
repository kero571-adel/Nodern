import Contact from "../../components/sections/Contact";
import FeedBack from "@/components/sections/FeedBack";
import Hero from "../../components/sections/Hero";
import Projects from "../../components/sections/Projects";
import Timeline from "../../components/sections/Timeline";
import WhyChooseUs from "../../components/sections/WhyChooseUs";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("nav");
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Projects />
      <FeedBack />
      <Timeline />
      <Contact />
    </>
  );
}
