"use client";

export default function HeroScrollButton({ text }) {
  const handleScroll = () => {
    const section = document.querySelector("#about");

    if (section) {
      const headerOffset = 80;

      const elementPosition = section.getBoundingClientRect().top;

      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <button
      onClick={handleScroll}
      className="absolute bottom-21 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group focus:outline-none"
      style={{ zIndex: 10 }}
      aria-label={text}
    >
      <span className="text-gray-500 text-xs tracking-widest uppercase group-hover:text-gray-300 transition-colors">
        {text}
      </span>

      <div className="scroll-mouse relative w-5 h-8 sm:w-6 sm:h-9 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors flex justify-center">
        <div
          className="scroll-line absolute w-[2px] bg-gradient-to-b from-purple-400 to-transparent rounded-full"
          style={{ top: "4px" }}
        />
      </div>

      <div className="animate-bounce">
        <svg
          className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </button>
  );
}
