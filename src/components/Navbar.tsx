import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, User, Sparkles, FolderGit2, Award, Mail, Menu, X } from "lucide-react";

const sections = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Sparkles },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "certifications", label: "Awards", icon: Award },
  { id: "contact", label: "Contact", icon: Mail },
];

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
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

  const handleClick = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-primary z-[60] origin-left"
        style={{ scaleX }}
      />

      {/* Desktop Navbar */}
      <div
        className={`fixed left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${
          scrolled ? "top-3" : "top-5"
        }`}
      >
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto"
        >
        <div className={`hidden md:flex items-center gap-2 glass rounded-full pl-2 pr-2 py-2 transition-all duration-500 ${
          scrolled ? 'shadow-elegant border-primary/20' : ''
        }`}>
          {/* Logo orb */}
          <motion.button
            onClick={() => handleClick("home")}
            whileHover={{ scale: 1.05, rotate: 360 }}
            transition={{ rotate: { duration: 0.6 } }}
            className="relative w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-sm text-primary-foreground shadow-glow shrink-0"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-primary blur-md opacity-60 animate-pulse" />
            <span className="relative">SM</span>
          </motion.button>

          {/* Nav items */}
          <div
            className="flex items-center relative"
            onMouseLeave={() => setHovered(null)}
          >
            {sections.map((s) => {
              const isActive = active === s.id;
              const isHovered = hovered === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => handleClick(s.id)}
                  onMouseEnter={() => setHovered(s.id)}
                  className="relative px-4 py-2 text-sm font-medium transition-colors group"
                >
                  {/* Hover spotlight */}
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-white/5 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {/* Active gradient pill */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-gradient-primary rounded-full shadow-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`relative flex items-center gap-1.5 transition-colors ${
                    isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    <motion.span
                      animate={isActive ? { rotate: [0, -10, 10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <s.icon className="w-3.5 h-3.5" />
                    </motion.span>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Hire me CTA */}
          <motion.button
            onClick={() => handleClick("contact")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative ml-1 inline-flex items-center gap-1.5 text-xs mono uppercase tracking-wider px-4 py-2 rounded-full overflow-hidden group shrink-0"
          >
            <span className="absolute inset-0 bg-gradient-primary" />
            <span className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative text-primary-foreground font-bold flex items-center gap-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
              </span>
              Hire Me
            </span>
          </motion.button>
        </div>

        {/* Mobile compact bar */}
        <div className="md:hidden flex items-center gap-3 glass rounded-full pl-2 pr-2 py-2 shadow-elegant">
          <motion.button
            onClick={() => handleClick("home")}
            whileHover={{ scale: 1.05 }}
            className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center font-display font-bold text-xs text-primary-foreground shrink-0"
          >
            SM
          </motion.button>
          <div className="flex-1 mono text-xs uppercase tracking-wider text-muted-foreground px-2 truncate">
            <span className="text-primary">/</span> {sections.find(s => s.id === active)?.label}
          </div>
          <motion.button
            onClick={() => setMobileOpen((o) => !o)}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
        </motion.nav>
      </div>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-20 left-4 right-4 z-50 glass rounded-3xl p-3 shadow-elegant"
            >
              <div className="grid grid-cols-2 gap-2">
                {sections.map((s, i) => {
                  const isActive = active === s.id;
                  return (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleClick(s.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <s.icon className="w-4 h-4" />
                      <span className="text-sm font-semibold">{s.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
