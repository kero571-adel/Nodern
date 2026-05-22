"use client";
import { useState } from "react";
import { useLocale } from "next-intl";
import SplashScreen from "@/components/SplashScreen";
import NetworkBackground from "@/components/NetworkBackground";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Projects from "@/components/sections/Projects";
import FeedBack from "@/components/sections/FeedBack";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const locale = useLocale();

  return (
    <>
      {/* ── Structured data injected into <head> via Next.js ── */}
      <JsonLd locale={locale} />

      {showSplash && (
        <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
      )}

      <NetworkBackground />

      {/*
       * ✅ id="main-content" is the skip-nav target defined in layout.js.
       * Screen-reader users and keyboard users can jump straight to content.
       */}
      <main
        id="main-content"
        className={`relative text-white ${showSplash ? "hidden" : "block"}`}
      >
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