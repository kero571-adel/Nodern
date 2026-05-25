import { useLocale } from "next-intl";
import NetworkBackground from "@/components/NetworkBackground";
import Hero from "@/components/sections/Hero/page";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Projects from "@/components/sections/Projects";
import FeedBack from "@/components/sections/FeedBack";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/JsonLd";
//import ClientSplash from "@/components/splash/ClientSplash";

export default function Home() {
  const locale = useLocale();

  return (
    <>
      <JsonLd locale={locale} />
      {/* <ClientSplash /> */}
      <NetworkBackground />
      <main id="main-content" className="relative text-white">
        <Hero />
        <WhyChooseUs />
        <Projects />
        <FeedBack />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}
