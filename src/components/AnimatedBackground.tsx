import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const AnimatedBackground = () => {
  // Normalized mouse position around center (-0.5 to 0.5)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 });

  // Per-layer parallax transforms (varying depth)
  const blob1X = useTransform(smx, (v) => v * 80);
  const blob1Y = useTransform(smy, (v) => v * 80);
  const blob2X = useTransform(smx, (v) => v * -120);
  const blob2Y = useTransform(smy, (v) => v * -120);
  const blob3X = useTransform(smx, (v) => v * 60);
  const blob3Y = useTransform(smy, (v) => v * -60);

  const gridX = useTransform(smx, (v) => v * -30);
  const gridY = useTransform(smy, (v) => v * -30);

  // Spotlight follows cursor (raw px)
  const spotX = useMotionValue(-1000);
  const spotY = useMotionValue(-1000);
  const sspotX = useSpring(spotX, { stiffness: 120, damping: 22 });
  const sspotY = useSpring(spotY, { stiffness: 120, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mx.set(nx);
      my.set(ny);
      spotX.set(e.clientX);
      spotY.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, spotX, spotY]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient blobs with parallax */}
      <motion.div
        style={{ x: blob1X, y: blob1Y }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] animate-blob"
      />
      <motion.div
        style={{ x: blob2X, y: blob2Y, animationDelay: "4s" } as React.CSSProperties}
        className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-secondary/25 rounded-full blur-[140px] animate-blob"
      />
      <motion.div
        style={{ x: blob3X, y: blob3Y, animationDelay: "8s" } as React.CSSProperties}
        className="absolute bottom-[-10%] left-[30%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] animate-blob"
      />

      {/* Cursor spotlight */}
      <motion.div
        style={{
          x: sspotX,
          y: sspotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[420px] h-[420px] rounded-full bg-primary/15 blur-[100px]"
      />

      {/* Grid overlay with subtle parallax */}
      <motion.div
        style={{
          x: gridX,
          y: gridY,
          backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        className="absolute -inset-10 opacity-[0.05]"
      />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/60"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * -200 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
