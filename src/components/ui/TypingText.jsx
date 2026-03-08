import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const TYPING_INTERVAL_MS = 38;

export const TypingText = ({ text, delay = 0, style = {} }) => {
  const reduced = useReducedMotion();
  const [ref, isVisible] = useInView();
  const [displayed, setDisplayed] = useState(reduced ? text : "");
  const [done, setDone] = useState(reduced);
  const hasRun = useRef(reduced);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;

    hasRun.current = true;
    let i = 0;
    let intervalId;

    const timeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(intervalId);
          setDone(true);
        }
      }, TYPING_INTERVAL_MS);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isVisible, delay, text]);

  return (
    <p ref={ref} style={style}>
      {displayed}
      <span
        style={{
          display: "inline-block",
          width: "1px",
          height: "0.85em",
          background: "currentColor",
          marginLeft: "2px",
          verticalAlign: "text-bottom",
          opacity: done ? 0 : 1,
          animation: done ? "none" : "cursor-blink 1s step-end infinite",
          transition: done ? "opacity 0.4s ease 0.6s" : "none",
        }}
      />
    </p>
  );
};
