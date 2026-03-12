import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export const useInView = (threshold = 0.12) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isObserverUnsupported = typeof window !== "undefined" && !window.IntersectionObserver;
  const [isVisible, setIsVisible] = useState(() => {
    if (reducedMotion) return true;
    if (isObserverUnsupported) return true;
    return false;
  });

  useEffect(() => {
    if (isVisible) return;

    if (reducedMotion || isObserverUnsupported) {
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
  }, [threshold, isVisible, reducedMotion, isObserverUnsupported]);

  return [ref, isVisible];
};
