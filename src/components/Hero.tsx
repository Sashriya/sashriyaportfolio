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
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
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
                  { icon: GithubIcon, href: "#" },
                  { icon: LinkedinIcon, href: "#" },
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

          {/* Floating creative composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative w-full max-w-md mx-auto aspect-square"
          >
            {/* Morphing blob backdrop */}
            <motion.div
              className="absolute inset-6 bg-gradient-primary opacity-70 blur-2xl"
              animate={{
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating code window */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 left-2 w-64 glass rounded-2xl p-4 shadow-elegant z-20"
            >
              <div className="flex gap-1.5 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-destructive" />
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              </div>
              <div className="mono text-[11px] space-y-1.5 leading-relaxed">
                <div><span className="text-secondary">const</span> <span className="text-primary">dev</span> = {`{`}</div>
                <div className="pl-3"><span className="text-accent">name</span>: <span className="text-secondary">'Sashriya'</span>,</div>
                <div className="pl-3"><span className="text-accent">stack</span>: <span className="text-secondary">'MERN'</span>,</div>
                <div className="pl-3"><span className="text-accent">loves</span>: <span className="text-secondary">'AI/ML'</span></div>
                <div>{`}`};</div>
              </div>
            </motion.div>

            {/* Floating tech chips */}
            {[
              { label: "React", x: "75%", y: "10%", delay: 0, color: "from-primary to-primary-glow" },
              { label: "Node.js", x: "82%", y: "55%", delay: 1, color: "from-secondary to-primary" },
              { label: "Python", x: "10%", y: "70%", delay: 0.5, color: "from-accent to-primary-glow" },
              { label: "MongoDB", x: "65%", y: "85%", delay: 1.5, color: "from-secondary to-accent" },
              { label: "AI/ML", x: "5%", y: "25%", delay: 2, color: "from-primary-glow to-secondary" },
            ].map((chip) => (
              <motion.div
                key={chip.label}
                className="absolute z-30"
                style={{ left: chip.x, top: chip.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                transition={{
                  opacity: { delay: 0.5 + chip.delay * 0.2 },
                  scale: { delay: 0.5 + chip.delay * 0.2, type: "spring" },
                  y: { duration: 3 + chip.delay, repeat: Infinity, ease: "easeInOut" },
                }}
                whileHover={{ scale: 1.15, rotate: 6 }}
              >
                <div className={`px-3 py-1.5 rounded-full bg-gradient-to-r ${chip.color} text-primary-foreground mono text-[11px] font-semibold shadow-glow whitespace-nowrap`}>
                  {chip.label}
                </div>
              </motion.div>
            ))}

            {/* Sparkle particles */}
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-accent z-10"
                style={{
                  left: `${20 + (i * 9) % 70}%`,
                  top: `${15 + (i * 13) % 70}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
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
