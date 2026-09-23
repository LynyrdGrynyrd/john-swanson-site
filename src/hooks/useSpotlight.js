import { useEffect } from "react";

/**
 * Tracks the pointer over any `.spotlight` element and exposes its position
 * as `--mx` / `--my` so CSS can paint a glow that follows the cursor.
 * One delegated listener covers every card on the page.
 */
export const useSpotlight = () => {
  useEffect(() => {
    const onMove = (event) => {
      const card = event.target.closest?.(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
};
