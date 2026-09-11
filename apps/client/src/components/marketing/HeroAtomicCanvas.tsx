"use client";

import * as React from "react";

interface SpherePoint {
  x: number;
  y: number;
  z: number;
  hot: boolean;
  ph: number;
}

/**
 * Rotating "event sphere": a Fibonacci point cloud under a perspective
 * projection, with great-circle links and packets travelling along them.
 * Drawn on a 2D canvas — no WebGL, no dependencies. Reads --accent every
 * frame, so a theme or accent change is picked up without a remount.
 */
export function HeroAtomicCanvas({
  centerX = 0.76,
  centerY = 0.46,
}: {
  centerX?: number;
  centerY?: number;
}) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const N = 320;
    const pts: SpherePoint[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = i * 2.39996323; // golden angle
      pts.push({
        x: Math.cos(th) * r,
        y,
        z: Math.sin(th) * r,
        hot: Math.random() < 0.07,
        ph: Math.random() * 6.28,
      });
    }

    const arcs: Array<[SpherePoint, SpherePoint, number]> = [];
    for (let i = 0; i < 18; i++) {
      arcs.push([
        pts[(Math.random() * N) | 0],
        pts[(Math.random() * N) | 0],
        Math.random(),
      ]);
    }

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const F = 2.6; // focal distance
    let yaw = 0.6;
    let pitch = -0.24;
    let t = 0;
    let tilt = 0;
    let tiltTarget = 0;
    let raf = 0;

    const onPointer = (e: PointerEvent) => {
      tiltTarget = (e.clientX / window.innerWidth - 0.5) * 0.55;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const rot = (p: { x: number; y: number; z: number }) => {
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const x1 = p.x * cy - p.z * sy;
      const z1 = p.x * sy + p.z * cy;
      return { x: x1, y: p.y * cp - z1 * sp, z: p.y * sp + z1 * cp };
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w * h === 0) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const bw = Math.round(w * dpr);
      const bh = Math.round(h * dpr);
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const cx = w * centerX;
      const cy = h * centerY;
      const R = Math.min(w * 0.34, h * 0.56);
      const acc =
        getComputedStyle(canvas).getPropertyValue("--accent").trim() ||
        "#2e6fd6";

      if (!reduce) {
        tilt += (tiltTarget - tilt) * 0.045;
        yaw += 0.0023;
        pitch = -0.24 + Math.sin(t * 0.0007) * 0.12 + tilt * 0.25;
        t += 16;
      }

      // latitude rings — the wireframe cage
      ctx.lineWidth = 1;
      ctx.strokeStyle = acc;
      for (let ring = -2; ring <= 2; ring++) {
        ctx.beginPath();
        for (let a = 0; a <= 72; a++) {
          const ang = (a / 72) * 6.28318;
          const ry = ring * 0.34;
          const rr = Math.sqrt(Math.max(0, 1 - ry * ry));
          const q = rot({ x: Math.cos(ang) * rr, y: ry, z: Math.sin(ang) * rr });
          const s = F / (F - q.z);
          const X = cx + q.x * R * s;
          const Y = cy + q.y * R * s;
          if (a === 0) ctx.moveTo(X, Y);
          else ctx.lineTo(X, Y);
        }
        ctx.globalAlpha = 0.085;
        ctx.stroke();
      }

      // links, each with a packet running along it
      for (const [na, nb, seed] of arcs) {
        const qa = rot(na);
        const qb = rot(nb);
        if (Math.max(qa.z, qb.z) + 0.4 <= 0) continue;
        const sa = F / (F - qa.z);
        const sb = F / (F - qb.z);
        const ax = cx + qa.x * R * sa;
        const ay = cy + qa.y * R * sa;
        const bx = cx + qb.x * R * sb;
        const by = cy + qb.y * R * sb;
        const mx = (ax + bx) / 2 - (ay - by) * 0.22;
        const my = (ay + by) / 2 + (ax - bx) * 0.22;

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mx, my, bx, by);
        ctx.globalAlpha = 0.13 + 0.09 * Math.sin(t * 0.001 + seed * 6);
        ctx.stroke();

        const u = (t * 0.00018 + seed) % 1;
        const iu = 1 - u;
        ctx.beginPath();
        ctx.arc(
          iu * iu * ax + 2 * iu * u * mx + u * u * bx,
          iu * iu * ay + 2 * iu * u * my + u * u * by,
          1.9,
          0,
          6.284,
        );
        ctx.fillStyle = acc;
        ctx.globalAlpha = 0.95;
        ctx.fill();
      }

      // nodes, painted back to front
      pts
        .map((p) => {
          const q = rot(p);
          const s = F / (F - q.z);
          return {
            sx: cx + q.x * R * s,
            sy: cy + q.y * R * s,
            z: q.z,
            s,
            hot: p.hot,
            ph: p.ph,
          };
        })
        .sort((p, q) => p.z - q.z)
        .forEach((p) => {
          const d = (p.z + 1) / 2;
          const rad = (p.hot ? 2.5 : 1.4) * p.s * (0.55 + d * 0.6);
          ctx.globalAlpha = 0.14 + d * 0.7;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, rad, 0, 6.284);
          ctx.fillStyle = acc;
          ctx.fill();
          if (p.hot) {
            const pu = (Math.sin(t * 0.0022 + p.ph) + 1) / 2;
            ctx.globalAlpha = (1 - pu) * 0.45 * d;
            ctx.beginPath();
            ctx.arc(p.sx, p.sy, rad + pu * 18, 0, 6.284);
            ctx.stroke();
          }
        });

      ctx.globalAlpha = 1;
    };

    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [centerX, centerY]);

  return <canvas ref={canvasRef} className="mk-hero-canvas" aria-hidden="true" />;
}
