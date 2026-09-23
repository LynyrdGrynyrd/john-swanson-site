import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "../../hooks/useInView";
import { themes } from "../../theme";

// Bead-spring polymer chains drifting behind the hero. The cursor pushes
// chains aside, and a click sends out a shockwave.
const BOND = 16; // rest length between beads, px
const DAMPING = 0.94;
const NOISE = 0.22; // thermal jitter per bead per step
const CONSTRAINT_PASSES = 3;
const CURSOR_RADIUS = 150;
const GLOW_RADIUS = 220;
const WAVE_SPEED = 9;
const WAVE_MAX = 420;
const STEP_MS = 1000 / 60;

const hexToRgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const accentFor = (isDark) => hexToRgb(themes[isDark ? "dark" : "light"]["--clr-accent"]);

function createChain(width, height) {
  const length = 14 + Math.floor(Math.random() * 16);
  let x = Math.random() * width;
  let y = Math.random() * height;
  let angle = Math.random() * Math.PI * 2;
  const beads = [];
  for (let i = 0; i < length; i += 1) {
    beads.push({ x, y, px: x, py: y });
    angle += (Math.random() - 0.5) * 1.1;
    x += Math.cos(angle) * BOND;
    y += Math.sin(angle) * BOND;
  }
  const drift = 0.006 + Math.random() * 0.012;
  const heading = Math.random() * Math.PI * 2;
  return { beads, fx: Math.cos(heading) * drift, fy: Math.sin(heading) * drift };
}

function createChains(width, height) {
  const count = Math.max(5, Math.min(12, Math.round((width * height) / 110000)));
  return Array.from({ length: count }, () => createChain(width, height));
}

function step(chains, width, height, pointer, waves) {
  for (const chain of chains) {
    const { beads } = chain;

    for (const b of beads) {
      const vx = (b.x - b.px) * DAMPING;
      const vy = (b.y - b.py) * DAMPING;
      b.px = b.x;
      b.py = b.y;
      b.x += vx + chain.fx + (Math.random() - 0.5) * NOISE;
      b.y += vy + chain.fy + (Math.random() - 0.5) * NOISE;

      if (pointer.active) {
        const dx = b.x - pointer.x;
        const dy = b.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < CURSOR_RADIUS * CURSOR_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const push = (1 - d / CURSOR_RADIUS) * 2.4;
          b.x += (dx / d) * push;
          b.y += (dy / d) * push;
        }
      }

      for (const w of waves) {
        const dx = b.x - w.x;
        const dy = b.y - w.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const front = Math.abs(d - w.r);
        if (front < 40) {
          const push = (1 - front / 40) * (1 - w.r / WAVE_MAX) * 5;
          b.x += (dx / d) * push;
          b.y += (dy / d) * push;
        }
      }
    }

    for (let pass = 0; pass < CONSTRAINT_PASSES; pass += 1) {
      // Bonds: hold neighbours at the rest length.
      for (let i = 0; i < beads.length - 1; i += 1) {
        const a = beads[i];
        const c = beads[i + 1];
        const dx = c.x - a.x;
        const dy = c.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const diff = ((d - BOND) / d) * 0.5;
        a.x += dx * diff;
        a.y += dy * diff;
        c.x -= dx * diff;
        c.y -= dy * diff;
      }
      // Bending stiffness: keep i and i+2 from folding onto each other.
      for (let i = 0; i < beads.length - 2; i += 1) {
        const a = beads[i];
        const c = beads[i + 2];
        const dx = c.x - a.x;
        const dy = c.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        const target = BOND * 1.6;
        if (d < target) {
          const diff = ((d - target) / d) * 0.1;
          a.x += dx * diff;
          a.y += dy * diff;
          c.x -= dx * diff;
          c.y -= dy * diff;
        }
      }
    }

    // Wrap chains that drift fully off one edge back in on the other.
    const mid = beads[beads.length >> 1];
    const margin = (beads.length * BOND) / 2;
    let shiftX = 0;
    let shiftY = 0;
    if (mid.x < -margin) shiftX = width + margin * 2;
    else if (mid.x > width + margin) shiftX = -(width + margin * 2);
    if (mid.y < -margin) shiftY = height + margin * 2;
    else if (mid.y > height + margin) shiftY = -(height + margin * 2);
    if (shiftX || shiftY) {
      for (const b of beads) {
        b.x += shiftX;
        b.px += shiftX;
        b.y += shiftY;
        b.py += shiftY;
      }
    }
  }

  for (const w of waves) w.r += WAVE_SPEED;
  return waves.filter((w) => w.r < WAVE_MAX);
}

function draw(ctx, chains, width, height, pointer, waves, [r, g, b]) {
  ctx.clearRect(0, 0, width, height);
  const rgb = `${r},${g},${b}`;

  // Soft light that follows the cursor, like a probe tip over the sample.
  if (pointer.active) {
    const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, GLOW_RADIUS);
    glow.addColorStop(0, `rgba(${rgb},0.12)`);
    glow.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = glow;
    ctx.fillRect(pointer.x - GLOW_RADIUS, pointer.y - GLOW_RADIUS, GLOW_RADIUS * 2, GLOW_RADIUS * 2);
  }

  ctx.lineWidth = 1.2;
  ctx.strokeStyle = `rgba(${rgb},0.4)`;
  for (const { beads } of chains) {
    ctx.beginPath();
    ctx.moveTo(beads[0].x, beads[0].y);
    for (let i = 1; i < beads.length - 1; i += 1) {
      const mx = (beads[i].x + beads[i + 1].x) / 2;
      const my = (beads[i].y + beads[i + 1].y) / 2;
      ctx.quadraticCurveTo(beads[i].x, beads[i].y, mx, my);
    }
    const last = beads[beads.length - 1];
    ctx.lineTo(last.x, last.y);
    ctx.stroke();
  }

  ctx.fillStyle = `rgb(${rgb})`;
  for (const { beads } of chains) {
    for (let i = 0; i < beads.length; i += 1) {
      const bead = beads[i];
      let near = 0;
      if (pointer.active) {
        const d = Math.hypot(bead.x - pointer.x, bead.y - pointer.y);
        near = Math.max(0, 1 - d / GLOW_RADIUS);
      }
      const isEnd = i === 0 || i === beads.length - 1;
      ctx.globalAlpha = 0.5 + near * 0.5;
      ctx.beginPath();
      ctx.arc(bead.x, bead.y, (isEnd ? 2.8 : 1.6) + near * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;

  for (const w of waves) {
    ctx.strokeStyle = `rgba(${rgb},${0.45 * (1 - w.r / WAVE_MAX)})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

export const PolymerField = ({ isDark }) => {
  const canvasRef = useRef(null);
  const colorRef = useRef(accentFor(isDark));
  const redrawRef = useRef(null);

  useEffect(() => {
    colorRef.current = accentFor(isDark);
    redrawRef.current?.();
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();
    const pointer = { x: 0, y: 0, active: false };
    let waves = [];
    let chains = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let last = 0;
    let acc = 0;
    let inView = true;

    const render = () => draw(ctx, chains, width, height, pointer, waves, colorRef.current);
    redrawRef.current = render;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const widthChanged = Math.abs(rect.width - width) > 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Mobile browsers resize height as the toolbar hides; only reseed on width changes.
      if (widthChanged || chains.length === 0) {
        chains = createChains(width, height);
        if (reduced) for (let i = 0; i < 90; i += 1) step(chains, width, height, pointer, []);
      }
      render();
    };

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      acc += Math.min(now - (last || now), 100);
      last = now;
      let steps = 0;
      while (acc >= STEP_MS && steps < 3) {
        waves = step(chains, width, height, pointer, waves);
        acc -= STEP_MS;
        steps += 1;
      }
      if (steps === 3) acc = 0;
      render();
    };

    const start = () => {
      if (reduced || frame || !inView || document.hidden) return;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.y >= 0 && pointer.y <= rect.height;
    };
    const onPointerUp = (event) => {
      if (event.pointerType !== "mouse") pointer.active = false;
    };
    const onPointerOut = (event) => {
      if (!event.relatedTarget) pointer.active = false;
    };
    const onPointerDown = (event) => {
      if (event.target.closest("a, button")) return;
      const rect = canvas.getBoundingClientRect();
      waves.push({ x: event.clientX - rect.left, y: event.clientY - rect.top, r: 0 });
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    viewObserver.observe(host);

    if (!reduced) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);
      document.addEventListener("pointerout", onPointerOut);
      host.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("visibilitychange", onVisibility);
    }
    start();

    return () => {
      stop();
      redrawRef.current = null;
      resizeObserver.disconnect();
      viewObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
      document.removeEventListener("pointerout", onPointerOut);
      host.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="polymer-field" aria-hidden="true" />;
};
