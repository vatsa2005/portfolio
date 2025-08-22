"use client";
import React, { useRef, useEffect, useState } from "react";

interface GooeyNavItem {
  label: string;
  href: string;
}

export interface GooeyNavProps {
  items: GooeyNavItem[];
  animationTime?: number;
  particleCount?: number;
  particleDistances?: [number, number];
  particleR?: number;
  timeVariance?: number;
  colors?: number[];
  initialActiveIndex?: number;
  controlledActiveIndex?: number; // optional external control
  onNavigate?: (href: string) => void; // callback to notify parent before scrolling
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  animationTime = 600,
  particleCount = 15,
  particleDistances = [90, 10],
  particleR = 100,
  timeVariance = 300,
  colors = [1, 2, 3, 1, 2, 3, 1, 4],
  initialActiveIndex = 0,
  controlledActiveIndex,
  onNavigate,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  // effect layers removed to avoid double text duplication
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex);

  // sync with controlled index
  useEffect(() => {
    if (typeof controlledActiveIndex === "number") {
      setActiveIndex(controlledActiveIndex);
    }
  }, [controlledActiveIndex]);

  const noise = (n = 1) => n / 2 - Math.random() * n;
  const getXY = (
    distance: number,
    pointIndex: number,
    totalPoints: number
  ): [number, number] => {
    const angle =
      ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180);
    return [distance * Math.cos(angle), distance * Math.sin(angle)];
  };
  const createParticle = (
    i: number,
    t: number,
    d: [number, number],
    r: number
  ) => {
    let rotate = noise(r / 10);
    return {
      start: getXY(d[0], particleCount - i, particleCount),
      end: getXY(d[1] + noise(7), particleCount - i, particleCount),
      time: t,
      scale: 1 + noise(0.2),
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
    };
  };
  // particle effect removed
  const updateEffectPosition = (element: HTMLElement) => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const pos = element.getBoundingClientRect();
    const styles = {
      left: `${pos.x - containerRect.x}px`,
      top: `${pos.y - containerRect.y}px`,
      width: `${pos.width}px`,
      height: `${pos.height}px`,
    } as const;
    // position logic simplified (no overlay updates)
  };
  const handleActivate = (index: number, element: HTMLElement) => {
    if (activeIndex === index) return;
    setActiveIndex(index);
    updateEffectPosition(element);
    // removed particle/text overlay refresh
  };
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    index: number
  ) => {
    e.preventDefault();
    onNavigate?.(items[index].href);
    const el = e.currentTarget.parentElement as HTMLElement;
    if (el) handleActivate(index, el);
    const targetId = items[index].href.replace("#", "");
    const section = document.getElementById(targetId);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLAnchorElement>,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const liEl = e.currentTarget.parentElement as HTMLElement;
      if (liEl) handleActivate(index, liEl);
    }
  };
  useEffect(() => {
    if (!navRef.current || !containerRef.current) return;
    const activeLi = navRef.current.querySelectorAll("li")[
      activeIndex
    ] as HTMLElement;
    if (activeLi) {
      updateEffectPosition(activeLi);
      // no text overlay
    }
    const resizeObserver = new ResizeObserver(() => {
      const currentActiveLi = navRef.current?.querySelectorAll("li")[
        activeIndex
      ] as HTMLElement;
      if (currentActiveLi) {
        updateEffectPosition(currentActiveLi);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [activeIndex]);

  return (
    <>
      <style>{`
        :root { --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1); }
        .gooey-nav-container { --color-1:#6366f1; --color-2:#818cf8; --color-3:#a5b4fc; --color-4:#c7d2fe; }
        .gooey-nav-container .effect { position:absolute; opacity:1; pointer-events:none; display:grid; place-items:center; z-index:1; }
        .gooey-nav-container .effect.text { color: white; transition: color 0.3s ease; font-weight:600; letter-spacing:0.5px; }
        .gooey-nav-container .effect.text.active { color: #0f172a; }
        .gooey-nav-container .effect.filter { filter: blur(7px) contrast(100) blur(0); mix-blend-mode: lighten; }
  /* Removed dark backdrop to avoid covering page content */
  .gooey-nav-container .effect.filter::before { content:""; position:absolute; inset:-75px; z-index:-2; background:transparent; }
        .gooey-nav-container .effect.filter::after { content:""; position:absolute; inset:0; background:white; transform:scale(0); opacity:0; z-index:-1; border-radius:9999px; }
        .gooey-nav-container .effect.active::after { animation:pill 0.3s ease both; }
        @keyframes pill { to { transform:scale(1); opacity:1; } }
        .gooey-nav-container .particle,.gooey-nav-container .point { display:block; opacity:0; width:20px; height:20px; border-radius:9999px; transform-origin:center; }
        .gooey-nav-container .particle { --time:5s; position:absolute; top:calc(50% - 8px); left:calc(50% - 8px); animation:particle calc(var(--time)) ease 1 -350ms; }
        .gooey-nav-container .point { background:var(--color); opacity:1; animation:point calc(var(--time)) ease 1 -350ms; }
        @keyframes particle { 0% { transform:rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y))); opacity:1; animation-timing-function:cubic-bezier(0.55,0,1,0.45);} 70% { transform:rotate(calc(var(--rotate)*0.5)) translate(calc(var(--end-x)*1.2), calc(var(--end-y)*1.2)); opacity:1; } 85% { transform:rotate(calc(var(--rotate)*0.66)) translate(calc(var(--end-x)), calc(var(--end-y))); opacity:1;} 100% { transform:rotate(calc(var(--rotate)*1.2)) translate(calc(var(--end-x)*0.5), calc(var(--end-y)*0.5)); opacity:1;} }
        @keyframes point { 0% { transform:scale(0); opacity:0; } 25% { transform:scale(calc(var(--scale)*0.25)); } 38% { opacity:1; } 65% { transform:scale(var(--scale)); opacity:1; } 85% { transform:scale(var(--scale)); opacity:1;} 100% { transform:scale(0); opacity:0; } }
  .gooey-nav-container li.active { color:#fff; text-shadow:none; }
  /* Remove white pill background to prevent obstruction */
  .gooey-nav-container li::after { display:none; }
      `}</style>
      <div className="gooey-nav-container relative" ref={containerRef}>
        <nav
          className="flex relative"
          style={{ transform: "translate3d(0,0,0.01px)" }}
        >
          <ul
            ref={navRef}
            className="flex gap-4 md:gap-6 list-none p-2 md:px-4 m-0 relative z-[3] rounded-full ring-1 ring-white/10 bg-slate-900/10 backdrop-blur-md"
            style={{
              color: "white",
            }}
          >
            {items.map((item, index) => (
              <li
                key={index}
                className={`relative cursor-pointer transition-[background-color,color,box-shadow] duration-300 ease text-sm md:text-base font-medium px-1 ${
                  activeIndex === index ? "active" : ""
                }`}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`outline-none py-2 md:py-[0.6em] px-4 inline-block rounded-full focus-visible:ring-2 focus-visible:ring-indigo-400 transition-colors ${
                    activeIndex === index
                      ? "bg-white text-slate-900 shadow-sm"
                      : "hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Removed duplicated effect layers to prevent double text */}
      </div>
    </>
  );
};

export default GooeyNav;
