import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView } from "../../hooks/useInView";

// Splits "$5.6M+" into prefix "$", number "5.6", suffix "M+".
const VALUE_PATTERN = /^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/;

const parseValue = (value) => {
  const match = value.match(VALUE_PATTERN);
  if (!match) return null;
  const [, prefix, numeric, suffix] = match;
  return { prefix, suffix, target: parseFloat(numeric), decimals: numeric.split(".")[1]?.length ?? 0 };
};

export const CountUpValue = ({ value }) => {
  const [ref, isVisible] = useInView();
  const hasRun = useRef(false);
  const [display, setDisplay] = useState(() => {
    const parsed = parseValue(value);
    if (!parsed || prefersReducedMotion()) return value;
    return `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!isVisible || hasRun.current || prefersReducedMotion()) return;

    const parsed = parseValue(value);
    if (!parsed) return;

    hasRun.current = true;
    const { prefix, suffix, target, decimals } = parsed;
    const duration = 1400;
    const start = performance.now();
    let raf;

    (function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(`${prefix}${(eased * target).toFixed(decimals)}${suffix}`);
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
