import { useEffect, useRef } from "react";

interface UseRevealOptions {
  /**
   * How much of the element must be visible before triggering (0–1).
   * Default: 0.08 — fire as soon as ~8% enters the viewport.
   */
  threshold?: number;
  /**
   * Shrink the bottom of the root by this many px, so elements animate
   * a little before they reach the very edge of the viewport.
   */
  rootMarginBottom?: number;
  /**
   * Once visible, disconnect the observer so the animation never replays.
   * Default: true.
   */
  once?: boolean;
}

/**
 * Returns a ref to attach to a DOM element.
 * When the element enters the viewport the class `reveal-visible` is added,
 * triggering the CSS transition defined on `.reveal`, `.reveal-left`, or
 * `.reveal-scale`.
 */
export function useReveal<T extends HTMLElement = HTMLElement>({
  threshold = 0.08,
  rootMarginBottom = 40,
  once = true,
}: UseRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("reveal-visible");
          if (once) observer.disconnect();
        } else if (!once) {
          el.classList.remove("reveal-visible");
        }
      },
      {
        threshold,
        rootMargin: `0px 0px -${rootMarginBottom}px 0px`,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMarginBottom, once]);

  return ref;
}

/**
 * Watches ALL `.reveal`, `.reveal-left`, and `.reveal-scale` elements
 * inside a container, firing them with optional stagger.
 * Call this once in a layout component to animate a whole list.
 */
export function useRevealGroup<T extends HTMLElement = HTMLElement>(
  staggerMs = 60
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-left, .reveal-scale"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );

    targets.forEach((el, i) => {
      // stagger delay stacks up to a max of ~400ms so long lists don't feel slow
      const delay = Math.min(i * staggerMs, 400);
      el.style.setProperty("--reveal-delay", `${delay}ms`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [staggerMs]);

  return ref;
}
