import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "baby narazgi choro naawww 🥺💗" },
      { name: "description", content: "A cute little sorry surprise for my princess 💗" },
      { property: "og:title", content: "baby narazgi choro naawww 🥺💗" },
      { property: "og:description", content: "A cute little sorry surprise for my princess 💗" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

import SAD_GIF from "@/assets/sad.png";
import PLEAD_GIF from "@/assets/plead.png";
import HUG_GIF from "@/assets/hug.png";

const NO_MSGS = [
  "Hehe, pakar ke dikhao 😝💗",
  "No nahi chalega, princess 🥺",
  "Awww, mujhe YES chahiye naawww 😭💕",
  "Itni bhi narazgi achi nahi hoti jaan 😔💗",
  "Please maan jao naaa 🥹🧸",
  "Catch me if you can, hehe 🤭💕",
];

function Gif({ src, fallback, className }: { src: string; fallback: string; className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <div className={`${className} flex items-center justify-center text-7xl`}>{fallback}</div>;
  return <img src={src} alt="" className={`${className} object-contain animate-bob`} onError={() => setFailed(true)} />;
}

function FloatingBg({ dense = false }: { dense?: boolean }) {
  const [items, setItems] = useState<{ left: number; dur: number; delay: number; size: number; e: string }[]>([]);
  useEffect(() => {
    const e = ["💗", "💕", "✨", "⭐", "🎀", "☁️", "💖", "🌸"];
    setItems(
      Array.from({ length: dense ? 30 : 18 }, () => ({
        left: Math.random() * 100,
        dur: 8 + Math.random() * 10,
        delay: -Math.random() * 15,
        size: 14 + Math.random() * 22,
        e: e[Math.floor(Math.random() * e.length)] ?? "💗",
      })),
    );
  }, [dense]);
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {items.map((it, i) => (
        <span
          key={i}
          className="animate-float-up absolute bottom-[-10%]"
          style={{ left: `${it.left}%`, fontSize: it.size, animationDuration: `${it.dur}s`, animationDelay: `${it.delay}s` }}
        >
          {it.e}
        </span>
      ))}
    </div>
  );
}

function Burst() {
  const parts = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => {
        const a = (i / 40) * Math.PI * 2;
        const r = 150 + Math.random() * 250;
        return { x: Math.cos(a) * r, y: Math.sin(a) * r, e: ["💖", "💗", "🎀", "✨", "💕"][i % 5] };
      }),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center" aria-hidden>
      {parts.map((p, i) => (
        <span key={i} className="animate-burst absolute text-2xl" style={{ ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px` }}>
          {p.e}
        </span>
      ))}
    </div>
  );
}

function Index() {
  const [yes, setYes] = useState(false);
  return (
    <main className="bg-love relative min-h-dvh overflow-hidden text-foreground">
      <FloatingBg dense={yes} />
      {yes ? <Success /> : <Ask onYes={() => setYes(true)} />}
    </main>
  );
}

function Ask({ onYes }: { onYes: () => void }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [wobbleKey, setWobbleKey] = useState(0);
  const yesRef = useRef<HTMLButtonElement>(null);
  const noRef = useRef<HTMLButtonElement>(null);

  const escape = useCallback(() => {
    const w = window.innerWidth, h = window.innerHeight;
    const bw = noRef.current?.offsetWidth ?? 120, bh = noRef.current?.offsetHeight ?? 56;
    const pad = 16;
    const yr = yesRef.current?.getBoundingClientRect();
    let x = 0, y = 0;
    for (let i = 0; i < 30; i++) {
      x = pad + Math.random() * (w - bw - pad * 2);
      y = pad + Math.random() * (h - bh - pad * 2 - 40) + 40;
      const overlapsYes = yr && x < yr.right + 20 && x + bw > yr.left - 20 && y < yr.bottom + 20 && y + bh > yr.top - 20;
      const tooClose = pos && Math.hypot(x - pos.x, y - pos.y) < 120;
      if (!overlapsYes && !tooClose) break;
    }
    setPos({ x, y });
    setMsg((m) => {
      let n = m;
      while (n === m) n = NO_MSGS[Math.floor(Math.random() * NO_MSGS.length)] ?? null;
      return n;
    });
    setWobbleKey((k) => k + 1);
  }, [pos]);

  useEffect(() => {
    const onResize = () => pos && escape();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pos, escape]);

  return (
    <section className="relative z-10 mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-5 py-10 text-center">
      <h1 className="animate-pop font-cute text-4xl leading-snug text-hot sm:text-5xl">baby narazgi choro naawww 🥺👉👈💗</h1>

      <div className="glass animate-pop relative mt-8 rounded-[2rem] p-5" style={{ animationDelay: ".15s" }}>
        {["🥺", "😭", "🥹", "🥲", "💔", "🧸", "💗"].map((e, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <span key={e} className="animate-bob absolute text-2xl" style={{ left: `calc(50% + ${Math.cos(a) * 52}% - 14px)`, top: `calc(50% + ${Math.sin(a) * 58}% - 14px)`, animationDelay: `${i * 0.3}s` }}>
              {e}
            </span>
          );
        })}
        <Gif src={SAD_GIF} fallback="🥺" className="h-44 w-44 sm:h-52 sm:w-52" />
      </div>

      <p className="mt-6 text-lg font-bold italic text-muted-foreground">Please naawww, meri jaan, ab maan bhi jao naaa 🥺👉👈</p>

      <Gif src={PLEAD_GIF} fallback="🐻" className="animate-bob mt-4 h-20 w-20" />

      <div className="mt-4 flex min-h-16 items-center justify-center gap-5">
        <button ref={yesRef} onClick={onYes} className="btn-yes rounded-full px-10 py-4 text-xl font-bold">
          YES 💖
        </button>
        {!pos && (
          <button ref={noRef} onPointerEnter={escape} onPointerDown={(e) => { e.preventDefault(); escape(); }} onTouchStart={(e) => { e.preventDefault(); escape(); }} onClick={escape} className="btn-no rounded-full px-8 py-4 text-xl font-bold">
            NO 😒
          </button>
        )}
      </div>

      {pos && (
        <div className="fixed z-20" style={{ left: pos.x, top: pos.y, transition: "left .35s cubic-bezier(.34,1.56,.64,1), top .35s cubic-bezier(.34,1.56,.64,1)" }}>
          {msg && (
            <span key={`m${wobbleKey}`} className="animate-pop glass absolute bottom-full left-1/2 mb-2 w-max max-w-[70vw] -translate-x-1/2 rounded-2xl px-3 py-1.5 text-sm font-bold text-hot">
              {msg}
            </span>
          )}
          <button
            key={wobbleKey}
            ref={noRef}
            onPointerEnter={escape}
            onPointerDown={(e) => { e.preventDefault(); escape(); }}
            onTouchStart={(e) => { e.preventDefault(); escape(); }}
            onClick={escape}
            className="btn-no animate-wobble rounded-full px-8 py-4 text-xl font-bold"
          >
            NO 😒
          </button>
        </div>
      )}
    </section>
  );
}

function Success() {
  return (
    <section className="relative z-10 mx-auto flex min-h-dvh max-w-xl flex-col items-center justify-center px-5 py-10 text-center">
      <Burst />
      <h1 className="animate-pop font-cute text-4xl leading-snug text-hot sm:text-5xl">Awww, thank you my princess 🥹💗</h1>
      <div className="glass animate-pop mt-8 rounded-[2rem] p-5" style={{ animationDelay: ".2s" }}>
        <Gif src={HUG_GIF} fallback="🫂" className="h-48 w-48 sm:h-56 sm:w-56" />
      </div>
      <p className="animate-pop mt-8 text-2xl font-bold text-hot" style={{ animationDelay: ".4s" }}>I love youuu sooooo muchhh, meri jaan! 🫶🏻🎀💕</p>
      <p className="animate-pop mt-4 text-lg italic text-muted-foreground" style={{ animationDelay: ".6s" }}>Ab gussa khatam? Ajao meri jaan, ab smile kar do naawww 🥺💋💗</p>
      <p className="animate-pop glass mt-10 rounded-full px-6 py-3 font-cute text-lg text-hot" style={{ animationDelay: ".9s" }}>You are my favorite person in the whole universe 🌎💗🎀</p>
    </section>
  );
}
