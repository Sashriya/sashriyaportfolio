import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const roles = ["Full Stack Developer", "MERN Stack Engineer", "AI/ML Enthusiast", "Problem Solver"];

const Hero = () => {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 50 : 100;
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        setText(current.slice(0, text.length - 1));
        if (text === "") {
          setDeleting(false);
          setRoleIdx((i) => (i + 1) % roles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16">
      <div className="container">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs mono uppercase tracking-wider text-muted-foreground">
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-4"
            >
              Hi, I'm <br />
              <span className="glow-text animate-gradient bg-gradient-primary bg-clip-text">
                Sashriya M
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground mb-6 h-8 mono"
            >
              <span className="text-primary">&gt;</span> {text}
              <span className="inline-block w-[2px] h-6 bg-primary ml-1 animate-pulse align-middle" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
            >
              Computer Science student crafting scalable web experiences with the MERN stack,
              Python, and AI/ML. I turn ideas into clean, maintainable code.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-glow-secondary transition-all duration-300 hover:scale-105"
              >
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full glass hover:bg-white/10 transition-colors font-semibold"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
              <div className="flex items-center gap-2 ml-2">
                {[
                  { icon: href: "#" },
                  { icon: href: "#" },
                  { icon: Mail, href: "mailto:sashriya.murali@gmail.com" },
                ].map(({ icon: Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    whileHover={{ y: -3, scale: 1.1 }}
                    className="w-11 h-11 rounded-full glass flex items-center justify-center hover:text-primary transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Avatar / orbital decoration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-md mx-auto aspect-square"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-glow animate-glow-pulse" />
            <div className="absolute inset-8 rounded-full border border-primary/20 animate-spin-slow" />
            <div className="absolute inset-16 rounded-full border border-secondary/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />

            {/* Orbiting tech badges */}
            {['React', 'Node', 'Python', 'AI', 'MongoDB'].map((tech, i) => {
              const angle = (i * 360) / 5;
              return (
                <motion.div
                  key={tech}
                  className="absolute top-1/2 left-1/2 w-14 h-14 -ml-7 -mt-7"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  style={{ transformOrigin: 'center' }}
                >
                  <div
                    className="absolute"
                    style={{
                      transform: `rotate(${angle}deg) translateY(-180px) rotate(-${angle}deg)`,
                    }}
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                      className="glass rounded-2xl px-4 py-2 mono text-xs whitespace-nowrap shadow-elegant"
                    >
                      {tech}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}

            <div className="absolute inset-24 rounded-full bg-gradient-primary p-1 animate-float">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="font-display text-7xl font-bold glow-text">SM</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
