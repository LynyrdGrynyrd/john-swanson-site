import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export const useInView = (threshold = 0.12) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (reducedMotion) return true;
    if (typeof window !== "undefined" && !window.IntersectionObserver) return true;
    return false;
  });

  useEffect(() => {
    if (isVisible) return;

    if (reducedMotion || (typeof window !== "undefined" && !window.IntersectionObserver)) {
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
  }, [threshold, isVisible, reducedMotion]);

  return [ref, isVisible];
};
