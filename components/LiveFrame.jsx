"use client";
import { useEffect, useRef, useState } from "react";

const FRAME_W = 1280;

export default function LiveFrame({ url, title, gradient }) {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [saveData, setSaveData] = useState(false);

  useEffect(() => {
    setSaveData(!!navigator.connection?.saveData);
    const el = boxRef.current;
    if (!el) return;

    const ro = new ResizeObserver(([e]) =>
      setSize({ w: e.contentRect.width, h: e.contentRect.height })
    );
    ro.observe(el);

    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (!e.isIntersecting) setLoaded(false);
      },
      { rootMargin: "150px" }
    );
    io.observe(el);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const scale = size.w ? size.w / FRAME_W : 0.3;
  const showFrame = inView && !saveData && size.w > 0;

  return (
    <div ref={boxRef} className="absolute inset-0 overflow-hidden bg-gray-900">
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${gradient} transition-opacity duration-300 ${
          loaded ? "opacity-0" : "opacity-80"
        }`}
      >
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      </div>

      {showFrame && (
        <iframe
          src={url}
          title={title}
          tabIndex={-1}
          aria-hidden="true"
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
          style={{
            width: FRAME_W,
            height: size.h / scale,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className={`pointer-events-none absolute left-0 top-0 border-0 bg-white transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}