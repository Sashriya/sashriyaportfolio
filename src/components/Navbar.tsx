import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const y = window.scrollY + 200;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(s.id);
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-primary z-[60] origin-left"
        style={{ scaleX }}
      />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <div className="container">
          <div className={`glass rounded-full px-6 py-3 flex items-center justify-between transition-all ${scrolled ? 'shadow-elegant' : ''}`}>
            <motion.a
              href="#home"
              whileHover={{ scale: 1.05 }}
              className="font-display font-bold text-lg"
            >
              <span className="glow-text">SM.</span>
            </motion.a>
            <div className="hidden md:flex items-center gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-gradient-primary rounded-full opacity-20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </a>
              ))}
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center text-xs mono uppercase tracking-wider px-4 py-2 rounded-full bg-gradient-primary text-primary-foreground font-semibold hover:shadow-glow transition-shadow"
            >
              Hire Me
            </a>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
