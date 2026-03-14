'use client';
import { useRef, useEffect, useState } from 'react';

// ─── Config ───────────────────────────────────────────────────────────────────
type Shape = 'phone' | 'laptop' | 'desktop' | 'code';
const SHAPES: Shape[] = ['code', 'phone', 'laptop', 'desktop'];

const SWITCH_MS          = 7000;  // time showing each shape
const SWIRL_MS           = 1400;  // total cauldron animation (2× slower)
const TARGET_ASSIGN_MS   = 700;   // when to assign new targets (mid-swirl)
const BURST_SPEED        = 11;    // initial velocity burst
const VORTEX_TAN         = 0.016; // tangential (spin) force
const VORTEX_CEN         = 0.006; // centripetal force

// Two brightness values for visual depth (like a real icon)
const FRAME  = 'white';            // body/border → brightness 1.0 → bright particles
const SCREEN = 'rgb(55, 55, 55)';  // screen/interior → brightness ~0.22 → dim particles

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number;
  targetX: number; targetY: number;
  vx: number; vy: number;
  length: number;
  baseAlpha: number;
  currentAlpha: number;
  delay: number;
}
interface State {
  particles: Particle[];
  start: number;
  shapeIdx: number;
  swirling: boolean;
  swirlStart: number;
}

// ─── Rounded rect helper ─────────────────────────────────────────────────────
function rrect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// ─── Shape drawing — two tones: FRAME (bright) + SCREEN (dim) ────────────────
function drawShape(ctx: CanvasRenderingContext2D, s: number, shape: Shape) {
  ctx.clearRect(0, 0, s, s);
  const cx = s / 2, cy = s / 2;

  if (shape === 'phone') {
    const pw = s * 0.38, ph = s * 0.74;
    const px = cx - pw / 2, py = cy - ph / 2;

    // Body (bright frame)
    ctx.fillStyle = FRAME;
    rrect(ctx, px, py, pw, ph, pw * 0.15); ctx.fill();

    // Screen (dim — slightly larger screen area)
    ctx.fillStyle = SCREEN;
    const sw = pw * 0.82, sh = ph * 0.66;
    rrect(ctx, cx - sw / 2, py + ph * 0.115, sw, sh, 4); ctx.fill();

    // Camera — SCREEN dot, smaller
    ctx.fillStyle = SCREEN;
    ctx.beginPath(); ctx.arc(cx, py + ph * 0.062, pw * 0.065, 0, Math.PI * 2); ctx.fill();

    // Home button — SCREEN circle, smaller
    ctx.fillStyle = SCREEN;
    ctx.beginPath(); ctx.arc(cx, py + ph * 0.922, pw * 0.11, 0, Math.PI * 2); ctx.fill();

  } else if (shape === 'laptop') {
    const sw = s * 0.78, sh = s * 0.46;
    const sx = cx - sw / 2, sy = cy - sh / 2 - s * 0.07;

    // Lid frame (bright)
    ctx.fillStyle = FRAME;
    rrect(ctx, sx, sy, sw, sh, 6); ctx.fill();

    // Screen interior (dim)
    ctx.fillStyle = SCREEN;
    ctx.fillRect(sx + 8, sy + 8, sw - 16, sh - 18);

    // Camera dot — bright highlight on dim screen (visible bright dot)
    ctx.fillStyle = FRAME;
    ctx.beginPath(); ctx.arc(cx, sy + 5, 3, 0, Math.PI * 2); ctx.fill();

    // Keyboard base — SCREEN (dark base so keys stand out)
    const kw = sw * 1.08, kh = s * 0.22;
    const kx = cx - kw / 2, ky = sy + sh + 2;
    ctx.fillStyle = SCREEN;
    rrect(ctx, kx, ky, kw, kh, 5); ctx.fill();

    // Keys — FRAME (bright keys on dark base = clearly visible!)
    ctx.fillStyle = FRAME;
    const cols = 10, rows = 3;
    const kpw = (kw - 16) / cols, kph = (kh - 14) / rows;
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        ctx.fillRect(kx + 8 + c * kpw, ky + 7 + r * (kph + 2.5), kpw - 4, kph - 1);

    // Touchpad — FRAME (bright touchpad visible on dark base)
    const tpw = kw * 0.22, tph = kh * 0.38;
    rrect(ctx, cx - tpw / 2, ky + kh * 0.46, tpw, tph, 3); ctx.fill();

  } else if (shape === 'desktop') {
    const ox = s * 0.05;

    // CPU tower — SCREEN (dark body so grilles stand out)
    const cw = s * 0.19, ch = s * 0.58;
    const cpux = cx - s * 0.44, cpuy = cy - ch / 2 + s * 0.03;
    ctx.fillStyle = SCREEN;
    rrect(ctx, cpux, cpuy, cw, ch, 5); ctx.fill();

    // CPU grilles — FRAME (bright ventilation lines on dark tower)
    ctx.fillStyle = FRAME;
    for (let i = 0; i < 6; i++)
      ctx.fillRect(cpux + 6, cpuy + 14 + i * 11, cw - 12, 5);

    // CPU power button — FRAME (bright button)
    ctx.beginPath(); ctx.arc(cpux + cw / 2, cpuy + ch - 16, 5, 0, Math.PI * 2); ctx.fill();

    // Monitor bezel (bright)
    const mw = s * 0.54, mh = s * 0.38;
    const mx = cx - mw / 2 + ox, my = cy - mh / 2 - s * 0.10;
    ctx.fillStyle = FRAME;
    rrect(ctx, mx, my, mw, mh, 5); ctx.fill();

    // Monitor screen (dim)
    ctx.fillStyle = SCREEN;
    ctx.fillRect(mx + 8, my + 8, mw - 16, mh - 18);

    // Stand neck + base (bright)
    ctx.fillStyle = FRAME;
    const snw = mw * 0.12, snh = s * 0.08;
    ctx.fillRect(mx + mw / 2 - snw / 2, my + mh, snw, snh);
    rrect(ctx, mx + mw / 2 - mw * 0.24, my + mh + snh - 3, mw * 0.48, 8, 4); ctx.fill();

    // Keyboard base — SCREEN (dark so keys stand out)
    const kbw = mw * 0.88, kbh = s * 0.10;
    const kbx = mx + mw / 2 - kbw / 2, kby = my + mh + snh + 10;
    ctx.fillStyle = SCREEN;
    rrect(ctx, kbx, kby, kbw, kbh, 4); ctx.fill();

    // Keyboard keys — FRAME (bright keys on dark base)
    ctx.fillStyle = FRAME;
    const kc = 9, kr = 2;
    const kpw2 = (kbw - 12) / kc, kph2 = (kbh - 10) / kr;
    for (let r = 0; r < kr; r++)
      for (let c = 0; c < kc; c++)
        ctx.fillRect(kbx + 6 + c * kpw2, kby + 5 + r * (kph2 + 2.5), kpw2 - 3.5, kph2 - 1);

  } else if (shape === 'code') {
    // Dark editor background
    ctx.fillStyle = SCREEN;
    rrect(ctx, s * 0.07, s * 0.10, s * 0.86, s * 0.80, 10); ctx.fill();

    // </> text (bright on dark bg)
    ctx.fillStyle = FRAME;
    const fs = Math.floor(s * 0.38);
    ctx.font = `bold ${fs}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('</>', cx, cy - s * 0.04);

    // Code hint lines below text
    const ly = cy + s * 0.25;
    ctx.fillRect(cx - s * 0.22, ly, s * 0.44, 3);
    ctx.fillRect(cx - s * 0.14, ly + 9, s * 0.28, 3);
  }
}

// ─── Pixel-sample → particles (very short strokes for high definition) ────────
function sampleShape(ctx: CanvasRenderingContext2D, s: number, small: boolean): Particle[] {
  const { data: px } = ctx.getImageData(0, 0, s, s);
  const pts: Particle[] = [];
  const rowGap = 3;  // tight 3px rows for high vertical resolution

  for (let y = 0; y < s; y += rowGap) {
    let x = 0;
    while (x < s) {
      const i = (y * s + x) * 4;
      if (px[i + 3] > 200) {
        const b = (px[i] + px[i + 1] + px[i + 2]) / (3 * 255);
        const len = Math.floor(1 + b * (small ? 3 : 4));  // max 5px strokes
        pts.push({ x, y, targetX: x, targetY: y, vx: 0, vy: 0, length: len, baseAlpha: 0.4 + b * 0.6, currentAlpha: 0, delay: 0 });
        x += len + 2;
      } else { x += 2; }
    }
  }
  return pts;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ParticleSilhouette() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -1000, y: -1000, active: false });
  const stateRef  = useRef<State>({ particles: [], start: 0, shapeIdx: 0, swirling: false, swirlStart: 0 });
  const [size, setSize] = useState(400);

  useEffect(() => {
    const upd = () => {
      const w = window.innerWidth;
      setSize(w <= 480 ? Math.min(220, w - 40) : w <= 1024 ? 300 : 400);
    };
    upd();
    window.addEventListener('resize', upd);
    return () => window.removeEventListener('resize', upd);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = size;
    canvas.height = size;
    const small = size <= 300;

    const getParticles = (shape: Shape) => {
      const off = document.createElement('canvas');
      off.width = size; off.height = size;
      const oc = off.getContext('2d')!;
      drawShape(oc, size, shape);
      return sampleShape(oc, size, small);
    };

    // ── Initial scatter-in ─────────────────────────────────────────────────
    const initPts = getParticles(SHAPES[0]);
    stateRef.current = {
      particles: initPts.map(p => ({
        ...p,
        x: p.targetX + (Math.random() - 0.5) * 300,
        y: p.targetY + (Math.random() - 0.5) * 300,
        delay: Math.random() * 0.3,
      })),
      start: performance.now(),
      shapeIdx: 0,
      swirling: false,
      swirlStart: 0,
    };

    // ── Shape-change timer ─────────────────────────────────────────────────
    const timer = setInterval(() => {
      const st = stateRef.current;
      const cur = st.particles;

      // Phase 1 — burst + vortex begins
      st.swirling   = true;
      st.swirlStart = performance.now();

      for (const p of cur) {
        p.vx += (Math.random() - 0.5) * BURST_SPEED;
        p.vy += (Math.random() - 0.5) * BURST_SPEED;
      }

      // Phase 2 — assign new targets at mid-swirl
      setTimeout(() => {
        st.shapeIdx = (st.shapeIdx + 1) % SHAPES.length;
        const newPts = getParticles(SHAPES[st.shapeIdx]);

        // Shuffle for chaotic morph paths
        for (let i = newPts.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newPts[i], newPts[j]] = [newPts[j], newPts[i]];
        }

        for (let i = 0; i < Math.max(cur.length, newPts.length); i++) {
          if (i < cur.length && i < newPts.length) {
            cur[i].targetX   = newPts[i].targetX;
            cur[i].targetY   = newPts[i].targetY;
            cur[i].length    = newPts[i].length;
            cur[i].baseAlpha = newPts[i].baseAlpha;
          } else if (i >= cur.length) {
            const p = newPts[i];
            cur.push({ ...p, x: p.targetX + (Math.random() - 0.5) * 200, y: p.targetY + (Math.random() - 0.5) * 200, currentAlpha: 0 });
          } else {
            cur[i].targetX = Math.random() < 0.5 ? -60 : size + 60;
            cur[i].targetY = Math.random() * size;
            cur[i].baseAlpha = 0;
          }
        }
      }, TARGET_ASSIGN_MS);

      // Phase 3 — end swirl after full duration
      setTimeout(() => { st.swirling = false; }, SWIRL_MS);

    }, SWITCH_MS);

    // ── Animation loop ─────────────────────────────────────────────────────
    let animId: number;
    const draw = () => {
      animId = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, size, size);

      const { x: mx, y: my, active } = mouseRef.current;
      const st = stateRef.current;
      const elapsed  = (performance.now() - st.start) / 1000;
      const swirlAge = st.swirling ? performance.now() - st.swirlStart : SWIRL_MS;
      const lw = small ? 1.5 : 2;
      const halfS = size / 2;

      for (const p of st.particles) {
        const t = elapsed - p.delay;
        if (t < 0) continue;

        // Fade in
        p.currentAlpha = p.baseAlpha * (1 - Math.pow(1 - Math.min(t / 1.5, 1), 2));

        // ── Cauldron vortex (full SWIRL_MS, fade-out in second half) ──────
        if (swirlAge < SWIRL_MS) {
          const progress = swirlAge / SWIRL_MS;
          // Bell-curve strength: peaks at 50%, fades toward end
          const strength = progress < 0.5
            ? progress * 2            // 0 → 1 in first half
            : 1 - (progress - 0.5) * 1.6; // 1 → ~0.2 in second half (doesn't reach 0)
          const s = Math.max(0, strength);
          const dx = p.x - halfS, dy = p.y - halfS;
          p.vx += -dy * VORTEX_TAN * s;
          p.vy +=  dx * VORTEX_TAN * s;
          p.vx += -dx * VORTEX_CEN * s;
          p.vy += -dy * VORTEX_CEN * s;
        }

        // ── Mouse repulsion ────────────────────────────────────────────────
        if (active) {
          const dx = p.x - mx, dy = p.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60 && dist > 0) {
            const f = (1 - dist / 60) * 2;
            p.vx += (dx / dist) * f;
            p.vy += (dy / dist) * f;
          }
        }

        // ── Spring toward target (weakened during swirl) ───────────────────
        const swirlFactor = swirlAge < SWIRL_MS
          ? (swirlAge > TARGET_ASSIGN_MS ? 0.5 : 0.15)
          : 1.0;
        const pull = (0.01 + (1 - Math.pow(1 - Math.min(t / 2.5, 1), 3)) * 0.07) * swirlFactor;
        p.vx += (p.targetX - p.x) * pull;
        p.vy += (p.targetY - p.y) * pull;
        p.vx *= 0.92; p.vy *= 0.92;
        p.x += p.vx;  p.y += p.vy;

        if (p.currentAlpha <= 0.01) continue;
        const dark = document.documentElement.classList.contains('dark');
        ctx.strokeStyle = dark
          ? `rgba(96, 165, 250, ${p.currentAlpha})`   // blue-400 no tema escuro
          : `rgba(29, 78, 216, ${p.currentAlpha})`;    // blue-700 no tema claro
        ctx.lineWidth = lw;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.length, p.y);
        ctx.stroke();
      }
    };
    draw();

    // ── Events ────────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top, active: true };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    const onTouch = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouseRef.current = { x: t.clientX - r.left, y: t.clientY - r.top, active: true };
    };

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);
    canvas.addEventListener('touchmove', onTouch);
    canvas.addEventListener('touchend', onLeave);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(timer);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
      canvas.removeEventListener('touchmove', onTouch);
      canvas.removeEventListener('touchend', onLeave);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${size}px`, height: `${size}px`, cursor: 'crosshair' }}
    />
  );
}
