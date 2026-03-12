import { useEffect, useRef, useState } from "react";

/**
 * Checks if the user prefers reduced motion.
 * @returns {boolean} True if the user prefers reduced motion, false otherwise.
 */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Custom hook to detect if an element is in the viewport.
 * @param {number} threshold - The threshold for intersection observer (0 to 1).
 * @returns {[React.MutableRefObject, boolean]} A ref to attach to the element and a boolean indicating visibility.
 */
export const useInView = (threshold = 0.12) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (prefersReducedMotion()) return true;
    // Fallback for environments without IntersectionObserver support
    if (typeof window !== "undefined" && !window.IntersectionObserver) return true;
    return false;
  });

  useEffect(() => {
    if (isVisible) return;

    const shouldBeVisible = prefersReducedMotion() || (typeof window !== "undefined" && !window.IntersectionObserver);
    if (shouldBeVisible) {
      // Defer state update to avoid synchronous render warning
      setTimeout(() => setIsVisible(true), 0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, isVisible]);

  return [ref, isVisible];
};
