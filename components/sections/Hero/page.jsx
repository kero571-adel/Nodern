import { useTranslations } from "next-intl";
import HeroScrollButton from "./HeroScrollButton";
export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden"
      style={{
        backgroundColor: "transparent",
        paddingTop: "calc(3.5rem + env(safe-area-inset-top))",
        paddingBottom: "calc(5rem + env(safe-area-inset-bottom))",
      }}
      aria-label="Hero section"
    >
      {/* CSS */}
      <style>{`
        @keyframes beamPulse {
          0%, 100% {
            opacity: 0.75;
          }

          50% {
            opacity: 1;
          }
        }

        @keyframes heroFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scrollBounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }

          50% {
            transform: translateY(6px);
            opacity: 0.5;
          }
        }

        @keyframes scrollLine {
  0%   { transform: scaleY(0) translateY(0); opacity: 1; }
  100% { transform: scaleY(1) translateY(10px); opacity: 0; }
}

        .hero-fade {
          opacity: 0;
          transform: translateY(20px);
          animation: heroFade 0.8s ease forwards;
        }

        .hero-delay-1 {
          animation-delay: 0.15s;
        }

        .hero-delay-2 {
          animation-delay: 0.3s;
        }

        .hero-delay-3 {
          animation-delay: 0.45s;
        }

        .beam-l {
          animation: beamPulse 4s ease-in-out infinite;
        }

        .beam-r {
          animation: beamPulse 5s ease-in-out infinite 1s;
        }

        .scroll-mouse {
          animation: scrollBounce 1.8s ease-in-out infinite;
        }

        .scroll-line {
          animation: scrollLine 1.8s ease-in-out infinite;
        }

        .hero-btn:focus-visible {
          outline: 2px solid #a78bfa;
          outline-offset: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* LEFT BEAM */}
      <div
        className="beam-l absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          left: "-8%",
          width: "clamp(180px, 30vw, 380px)",
          height: "90%",
          background:
            "linear-gradient(to top, rgba(140,50,250,0.55) 0%, rgba(160,80,255,0.24) 40%, transparent 78%)",
          transformOrigin: "bottom left",
          transform: "rotate(-30deg)",
          filter: "blur(24px)",
          borderRadius: "40% 40% 0 0",
        }}
      />

      <div
        className="beam-l absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          left: "4%",
          width: "clamp(25px, 4vw, 50px)",
          height: "80%",
          background:
            "linear-gradient(to top, rgba(180,100,255,0.9) 0%, rgba(200,130,255,0.4) 38%, rgba(210,150,255,0.08) 68%, transparent 88%)",
          transformOrigin: "bottom center",
          transform: "rotate(-30deg)",
          filter: "blur(8px)",
          borderRadius: "9999px",
        }}
      />

      <div
        className="beam-l absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          left: "5.5%",
          width: "8px",
          height: "70%",
          background:
            "linear-gradient(to top, rgba(240,200,255,0.9) 0%, rgba(220,180,255,0.55) 32%, transparent 72%)",
          transformOrigin: "bottom center",
          transform: "rotate(-30deg)",
          filter: "blur(2px)",
          borderRadius: "9999px",
        }}
      />

      {/* RIGHT BEAM */}
      <div
        className="beam-r absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          right: "-8%",
          width: "clamp(180px, 30vw, 380px)",
          height: "90%",
          background:
            "linear-gradient(to top, rgba(40,110,250,0.55) 0%, rgba(60,140,255,0.24) 40%, transparent 78%)",
          transformOrigin: "bottom right",
          transform: "rotate(30deg)",
          filter: "blur(24px)",
          borderRadius: "40% 40% 0 0",
        }}
      />

      <div
        className="beam-r absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          right: "4%",
          width: "clamp(25px, 4vw, 50px)",
          height: "80%",
          background:
            "linear-gradient(to top, rgba(70,150,255,0.9) 0%, rgba(100,170,255,0.4) 38%, rgba(130,190,255,0.08) 68%, transparent 88%)",
          transformOrigin: "bottom center",
          transform: "rotate(30deg)",
          filter: "blur(8px)",
          borderRadius: "9999px",
        }}
      />

      <div
        className="beam-r absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 2,
          bottom: "-5%",
          right: "5.5%",
          width: "8px",
          height: "70%",
          background:
            "linear-gradient(to top, rgba(190,225,255,0.9) 0%, rgba(170,215,255,0.55) 32%, transparent 72%)",
          transformOrigin: "bottom center",
          transform: "rotate(30deg)",
          filter: "blur(2px)",
          borderRadius: "9999px",
        }}
      />

      {/* OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 3,
          background:
            "radial-gradient(ellipse 78% 55% at 50% 46%, transparent 22%, rgba(5,5,10,0.55) 100%)",
        }}
      />

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 3,
          height: "110px",
          background: "linear-gradient(to top, #05050A, transparent)",
        }}
      />

      {/* CONTENT */}
      <div
        className="container mx-auto flex flex-col items-center px-2 w-full"
        style={{ position: "relative", zIndex: 10 }}
      >
        {/* Badge */}
        <div className="hero-fade hero-delay-1 mb-3 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-gray-300 lg:text-[20px] sm:text-[15px] font-medium tracking-wide">
            {t("line1")}
          </span>
        </div>

        {/* Heading */}
        <h1 className="hero-fade hero-delay-2 text-[clamp(1.3rem,6vw,5rem)] font-extrabold leading-[1.25] mb-2 sm:mb-6 tracking-tight w-full">
          <span className="text-white block pb-0.5">{t("line2_first")}</span>

          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent block pt-0.5">
            {t("line2_second")}
          </span>
        </h1>

        {/* Paragraph */}
        <p className="hero-fade hero-delay-3 text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mb-4 sm:mb-12 font-light px-1 sm:px-2">
          {t("line3")}
        </p>
      </div>

      {/* Scroll Down */}
      <HeroScrollButton text={t("scrollText")} />
    </section>
  );
}
