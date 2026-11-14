import React, { useEffect, useRef } from "react";

export const ParallaxBackground = () => {
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const watermark1Ref = useRef(null);
  const watermark2Ref = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle nodes with chromatic red, blue, and white hues
    const particles = [];
    const count = 75;
    const colors = [
      "rgba(255, 255, 255, ",     // Clean architectural white
      "rgba(96, 165, 250, ",      // Electric cobalt blue
      "rgba(244, 63, 94, ",       // Ruby / crimson red
      "rgba(147, 197, 253, ",     // Sky light blue
      "rgba(251, 113, 133, ",     // Soft rose red
    ];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 3,
        radius: Math.random() * 1.6 + 0.6,
        parallaxFactor: Math.random() * 0.45 + 0.1,
        alpha: Math.random() * 0.5 + 0.2,
        colorPrefix: colors[i % colors.length],
      });
    }

    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;

      // Parallax coordinate grid translation
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(0, ${-(scrollY * 0.12)}px, 0)`;
      }

      // Parallax Watermark 1 (Glides left - Electric Blue accent)
      if (watermark1Ref.current) {
        watermark1Ref.current.style.transform = `translate3d(${-(scrollY * 0.35)}px, ${-(scrollY * 0.05)}px, 0)`;
      }

      // Parallax Watermark 2 (Glides right - Crimson Red accent)
      if (watermark2Ref.current) {
        watermark2Ref.current.style.transform = `translate3d(${-400 + scrollY * 0.3}px, ${-(scrollY * 0.05)}px, 0)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationFrameId;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const screenY = (p.y - scrollY * p.parallaxFactor) % (height * 1.5);
        const wrappedY = screenY < 0 ? screenY + height : screenY;

        ctx.beginPath();
        ctx.arc(p.x, wrappedY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorPrefix}${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Layer 1: Ambient Canvas Chromatic Particles (Red, Blue, White) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-70"
      />

      {/* Layer 2: Parallax Blueprint Coordinate Grid */}
      <div
        ref={gridRef}
        className="absolute -top-40 -left-40 w-[140vw] h-[160vh] bg-grid-white opacity-40 will-change-transform [mask-image:radial-gradient(ellipse_at_center,transparent_15%,black)]"
      />

      {/* Layer 3A: Kinetic Watermark 1 (Electric Blue Accent - Panning Left) */}
      <div
        ref={watermark1Ref}
        className="absolute top-[22vh] -left-10 text-[13vw] font-black uppercase select-none whitespace-nowrap tracking-tight font-heading will-change-transform"
        style={{
          WebkitTextStroke: "1.5px rgba(96, 165, 250, 0.15)",
          color: "rgba(59, 130, 246, 0.03)",
          letterSpacing: "0.04em",
        }}
      >
        SYSTEMS • CONCURRENCY • BYNOE • ARCHITECTURE
      </div>

      {/* Layer 3B: Kinetic Watermark 2 (Crimson Red Accent - Panning Right) */}
      <div
        ref={watermark2Ref}
        className="absolute top-[68vh] -left-20 text-[11vw] font-black uppercase select-none whitespace-nowrap tracking-tight font-heading will-change-transform"
        style={{
          WebkitTextStroke: "1.5px rgba(244, 63, 94, 0.15)",
          color: "rgba(239, 68, 68, 0.03)",
          letterSpacing: "0.04em",
        }}
      >
        LOW-LATENCY • DATA PIPELINES • DISTRIBUTED SYSTEMS
      </div>

      {/* Dynamic Red & Blue Ambient Radial Mesh Lights */}
      {/* Top Left: Electric Cobalt Blue Glow */}
      <div className="absolute top-0 left-[-10%] w-[700px] h-[550px] bg-blue-600/15 blur-[160px] rounded-full pointer-events-none" />

      {/* Top Right: Crimson Ruby Red Glow */}
      <div className="absolute top-[-5%] right-[-5%] w-[650px] h-[550px] bg-red-600/12 blur-[170px] rounded-full pointer-events-none" />

      {/* Mid Section: Deep Blue Aura */}
      <div className="absolute top-[45%] left-[20%] w-[600px] h-[500px] bg-indigo-600/10 blur-[180px] rounded-full pointer-events-none" />

      {/* Lower Section: Deep Crimson Aura */}
      <div className="absolute bottom-[5%] right-[10%] w-[700px] h-[600px] bg-rose-600/12 blur-[170px] rounded-full pointer-events-none" />
    </div>
  );
};

export default ParallaxBackground;
