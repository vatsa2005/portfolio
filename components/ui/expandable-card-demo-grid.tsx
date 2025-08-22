"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
export type CardItem = {
  title: string;
  description: string;
  summary?: string;
  src: string;
  ctaText?: string;
  ctaLink?: string;
  githubUrl?: string;
  visitUrl?: string;
  tech?: string[];
  content?: React.ReactNode | (() => React.ReactNode);
};

export default function ExpandableCardDemo({
  items,
  className,
}: {
  items?: CardItem[];
  className?: string;
}) {
  const localCards: CardItem[] = items && items.length ? items : cards;
  const [active, setActive] = useState<CardItem | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm h-full w-full z-30"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center md:place-items-start md:justify-items-center md:pt-24 lg:pt-28 z-[9999] p-3 sm:p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="relative w-[94vw] sm:w-auto max-w-xl md:max-w-[44rem] lg:max-w-[46rem] h-fit max-h-[85vh] sm:max-h-[90%] md:max-h-[85vh] flex flex-col bg-white dark:bg-neutral-900 rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg"
            >
              <motion.button
                key={`button-${active.title}-${id}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.05 } }}
                type="button"
                aria-label="Close"
                title="Close"
                className="absolute top-2 right-2 items-center justify-center h-7 w-7 hidden lg:flex rounded-full border border-indigo-300/60 bg-white/80 text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:bg-neutral-900/80 dark:text-indigo-200 dark:border-indigo-300/40 dark:hover:bg-neutral-800"
                onClick={() => setActive(null)}
              >
                <CloseIcon />
              </motion.button>
              <motion.div
                layoutId={`image-${active.title}-${id}`}
                className="shrink-0"
              >
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-40 sm:h-64 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="flex flex-col flex-1 min-h-0 overflow-y-auto scrollbar-thin">
                <div className="p-4 mt-3 sm:mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-semibold text-neutral-800 dark:text-neutral-100 text-lg sm:text-xl"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="mt-1 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base"
                    >
                      {active.description}
                    </motion.p>
                    {Array.isArray((active as any).tech) &&
                      (active as any).tech.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {(active as any).tech.map((t: string) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 text-xs rounded-full border border-indigo-300/50 text-indigo-200 bg-indigo-500/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                  </div>
                  <div className="w-full sm:w-auto grid grid-cols-2 gap-2 sm:flex sm:items-center">
                    {/* GitHub button */}
                    {active.githubUrl ? (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center px-4 py-2 text-sm rounded-full font-semibold border border-[#24292f] bg-[#f6f8fa] text-[#24292f] hover:bg-[#eaecef] hover:border-[#1b1f23] focus:outline-none focus:ring-2 focus:ring-[#24292f]/30 dark:bg-[#24292f] dark:text-[#f6f8fa] dark:border-[#444d56] dark:hover:bg-[#1b1f23] dark:hover:border-[#24292f] transition-colors"
                      >
                        GitHub
                      </motion.a>
                    ) : null}

                    {/* Visit button */}
                    {active.visitUrl ? (
                      <motion.a
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        href={active.visitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto text-center px-4 py-2 text-sm rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow ring-1 ring-indigo-300/40 transition-colors"
                      >
                        Visit
                      </motion.a>
                    ) : null}
                  </div>
                </div>
                <div className="relative px-4 pt-3 sm:pt-5 mt-3 sm:mt-4 flex-1 min-h-0">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm sm:text-base flex-1 min-h-0 pb-5 sm:pb-7 flex flex-col items-start gap-5 sm:gap-6 dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
                {/* Footer with Close button */}
                <div className="px-4 pb-4 sm:pb-5 pt-3 mt-3 sm:mt-4 flex justify-end border-t border-neutral-200 dark:border-neutral-800 lg:hidden">
                  <button
                    type="button"
                    aria-label="Close popup"
                    className="px-4 py-2 text-sm rounded-full font-medium border border-indigo-300 text-indigo-700 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 dark:border-indigo-300/40 dark:text-indigo-200 dark:hover:bg-neutral-800"
                    onClick={() => setActive(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="relative w-full h-full">
        <ul
          className={
            "max-w-6xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start gap-3 sm:gap-4 h-full overflow-y-auto pr-1 sm:pr-2 scrollbar-thin " +
            (className ?? "")
          }
        >
          {localCards.map((card, index) => (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="group p-2 sm:p-3 rounded-2xl cursor-pointer transition-colors"
            >
              <div className="p-5 flex flex-col rounded-2xl transition-colors group-hover:bg-neutral-50/70 dark:group-hover:bg-neutral-800/70">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <img
                    width={100}
                    height={100}
                    src={card.src}
                    alt={card.title}
                    className="h-60 w-full  rounded-lg object-cover object-top"
                  />
                </motion.div>
                <div className="flex justify-center items-center flex-col">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="mt-2 font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-lg md:text-xl"
                  >
                    {card.title}
                  </motion.h3>
                  {card.summary && (
                    <p className="mt-2 text-neutral-500 dark:text-neutral-400 text-center text-sm md:text-base">
                      {card.summary}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </ul>
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-current"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards: CardItem[] = [
  {
    description: "Lana Del Rey",
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for
          her melancholic and cinematic music style. Born Elizabeth Woolridge
          Grant in New York City, she has captivated audiences worldwide with
          her haunting voice and introspective lyrics. <br /> <br /> Her songs
          often explore themes of tragic romance, glamour, and melancholia,
          drawing inspiration from both contemporary and vintage pop culture.
          With a career that has seen numerous critically acclaimed albums, Lana
          Del Rey has established herself as a unique and influential figure in
          the music industry, earning a dedicated fan base and numerous
          accolades.
        </p>
      );
    },
  },
  {
    description: "Babbu Maan",
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Babu Maan, a legendary Punjabi singer, is renowned for his soulful
          voice and profound lyrics that resonate deeply with his audience. Born
          in the village of Khant Maanpur in Punjab, India, he has become a
          cultural icon in the Punjabi music industry. <br /> <br /> His songs
          often reflect the struggles and triumphs of everyday life, capturing
          the essence of Punjabi culture and traditions. With a career spanning
          over two decades, Babu Maan has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },

  {
    description: "Metallica",
    title: "For Whom The Bell Tolls",
    src: "https://assets.aceternity.com/demos/metallica.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Metallica, an iconic American heavy metal band, is renowned for their
          powerful sound and intense performances that resonate deeply with
          their audience. Formed in Los Angeles, California, they have become a
          cultural icon in the heavy metal music industry. <br /> <br /> Their
          songs often reflect themes of aggression, social issues, and personal
          struggles, capturing the essence of the heavy metal genre. With a
          career spanning over four decades, Metallica has released numerous hit
          albums and singles that have garnered them a massive fan following
          both in the United States and abroad.
        </p>
      );
    },
  },
  {
    description: "Lord Himesh",
    title: "Aap Ka Suroor",
    src: "https://assets.aceternity.com/demos/aap-ka-suroor.jpeg",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
];
