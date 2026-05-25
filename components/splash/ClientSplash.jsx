"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const SplashScreen = dynamic(
  () => import("@/components/splash/SplashScreen"),
  { ssr: false }
);

export default function ClientSplash() {
  const [showSplash, setShowSplash] = useState(true);

  if (!showSplash) return null;

  return (
    <SplashScreen
      onAnimationComplete={() => setShowSplash(false)}
    />
  );
}