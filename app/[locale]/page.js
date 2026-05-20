"use client";
import { useState } from "react";
import SplashScreen from "@/components/SplashScreen";
import NetworkBackground from "@/components/NetworkBackground";
import Hero from "@/components/sections/Hero";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Projects from "@/components/sections/Projects";
import FeedBack from "@/components/sections/FeedBack";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && (
        <SplashScreen onAnimationComplete={() => setShowSplash(false)} />
      )}
      <NetworkBackground />
      <main
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
