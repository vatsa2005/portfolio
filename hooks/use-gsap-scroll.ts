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
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(".scroll-animate, .reveal-divider")
    );

    const tweens: gsap.core.Tween[] = [];

    elements.forEach((el) => {
      // Ensure CSS class-driven state doesn't interfere
      el.classList.remove("animate-in");

      const isFadeScale = el.classList.contains("fade-scale");
      const group = el.getAttribute("data-stagger-group");
      const delay = group === "hero" ? 0.1 : 0;

      // Set initial hidden state explicitly
      if (el.classList.contains("reveal-divider")) {
        gsap.set(el, { autoAlpha: 0, width: 0 });
      } else {
        gsap.set(el, {
          autoAlpha: 0,
          y: 20,
          scale: isFadeScale ? 0.98 : 1,
          filter: "blur(2px)",
        });
      }

      const tween = gsap.to(el, {
        ...(el.classList.contains("reveal-divider")
          ? { autoAlpha: 1, width: "4rem" }
          : {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }),
        ease: "power2.out",
        duration: 0.8,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          end: "top 60%",
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      tweens.push(tween);
    });

    // Ensure ScrollTrigger calculates positions correctly
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("load", refresh);

    // Failsafe: if no triggers were created, reveal content to avoid invisibility
    const failsafe = window.setTimeout(() => {
      if (ScrollTrigger.getAll().length === 0) {
        elements.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.filter = "none";
        });
      }
    }, 1200);

    return () => {
      tweens.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener("load", refresh);
      window.clearTimeout(failsafe);
    };
  }, []);
}
