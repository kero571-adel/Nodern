// app/[locale]/page.js
import dynamic from "next/dynamic";
import Hero from "@/components/sections/Hero/page";
import JsonLd from "@/components/JsonLd";
import { useLocale } from "next-intl";

// Lazy load everything below the fold
import NetworkBackground from "@/components/NetworkBackground";
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs"));
const Projects = dynamic(() => import("@/components/sections/Projects"));
const FeedBack = dynamic(() => import("@/components/sections/FeedBack"));
const Timeline = dynamic(() => import("@/components/sections/Timeline"));
const Contact = dynamic(() => import("@/components/sections/Contact"));

export default function Home() {
  const locale = useLocale();
  return (
    <>
      <JsonLd locale={locale} />
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
