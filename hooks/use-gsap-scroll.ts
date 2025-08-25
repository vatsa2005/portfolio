"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Sets up smooth, retriggerable scroll animations for elements with `.scroll-animate`.
 * - Fades and lifts elements into view with easing.
 * - Reverses on scroll-out so it can replay on revisit.
 */
export function useGsapScrollAnimations() {
  // No-op: scroll animations disabled to improve performance.
  useEffect(() => {
    // Reveal any elements that might rely on animation classes
    document
      .querySelectorAll<HTMLElement>(".scroll-animate, .reveal-divider")
      .forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        if (el.classList.contains("reveal-divider")) {
          el.style.width = "4rem";
        }
        el.style.filter = "none";
      });
    return () => {
      /* no cleanup required */
    };
  }, []);
}
