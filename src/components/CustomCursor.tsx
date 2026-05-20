import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 20, mass: 0.6 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 20, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    let trailId = 0;
    let lastTrail = 0;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);

      const now = performance.now();
      if (now - lastTrail > 40) {
        lastTrail = now;
        const id = trailId++;
        setTrails((t) => [...t.slice(-10), { id, x: e.clientX, y: e.clientY }]);
        setTimeout(() => setTrails((t) => t.filter((p) => p.id !== id)), 600);
      }

      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, label, .cursor-pointer'
      );
      setHovering(isInteractive);
    };

    const down = () => setClicking(true);
    const up = () => setClicking(false);
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    document.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, [cursorX, cursorY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
      aria-hidden
    >
      {/* Trail particles */}
      {trails.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute w-2 h-2 -ml-1 -mt-1 rounded-full bg-gradient-primary blur-[2px]"
          style={{ left: t.x, top: t.y }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        style={{
          translateX: ringX,
          translateY: ringY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          scale: clicking ? 0.75 : 1,
          rotate: hovering ? 90 : 0,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="absolute rounded-full border-2 border-primary/70 mix-blend-difference"
      />

      {/* Inner dot */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          scale: clicking ? 2.2 : hovering ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="absolute w-2 h-2 rounded-full bg-gradient-primary shadow-glow"
      />
    </div>
  );
};

export default CustomCursor;
