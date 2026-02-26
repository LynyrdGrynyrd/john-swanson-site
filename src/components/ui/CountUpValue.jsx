import { useEffect, useRef, useState } from "react";
import { useInView } from "../../hooks/useInView";

export const CountUpValue = ({ value }) => {
  const [ref, isVisible] = useInView();
  const hasRun = useRef(false);
  const init = value.replace(/\d+/, "0");
  const [display, setDisplay] = useState(init);

  useEffect(() => {
    if (!isVisible || hasRun.current) return;

    const match = value.match(/^([^0-9]*)(\d+)(.*)$/);
    if (!match) return;

    hasRun.current = true;
    const [, prefix, numeric, suffix] = match;
    const target = parseInt(numeric, 10);
    const duration = 1200;
    const start = performance.now();
    let raf;

    (function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(`${prefix}${Math.round((1 - (1 - progress) ** 3) * target)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    })(start);

    return () => cancelAnimationFrame(raf);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="metric-value">
      {display}
    </div>
  );
};
