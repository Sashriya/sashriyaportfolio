import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "./Section";
import { GraduationCap, Code2, Briefcase, Languages } from "lucide-react";

const stats = [
  { label: "CGPA", value: "8.00" },
  { label: "Projects", value: "3+" },
  { label: "Experience", value: "2" },
  { label: "Graduating", value: "2027" },
];

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <Section id="about" eyebrow="Who I Am" title="About Me" subtitle="A passionate developer driven by curiosity and a love for clean code.">
      <div ref={ref} className="grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="glass rounded-3xl p-8 md:p-10 relative overflow-hidden glow-border"
        >
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
          <p className="text-lg leading-relaxed text-muted-foreground mb-6 relative">
            I'm a final-year Computer Science undergraduate and Full Stack Developer with hands-on
            experience building <span className="text-primary font-semibold">production-style MERN applications</span>,{" "}
            real-time multi-user systems, and <span className="text-secondary font-semibold">AI-powered products</span>.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground mb-8 relative">
            My foundations include Data Structures & Algorithms, OOP, DBMS, Operating Systems, and
            Computer Networks. I'm seeking Software Engineer or Full Stack Developer roles where I
            can design, build, and ship reliable products.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 relative">
            {[
              { icon: GraduationCap, title: "B.E. CSE", sub: "KSR IET • 2023–2027" },
              { icon: Briefcase, title: "2 Roles", sub: "Full Stack & AI Product" },
              { icon: Code2, title: "Full Stack", sub: "MERN + REST APIs" },
              { icon: Languages, title: "Languages", sub: "Tamil (Native), English" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 1 : -1 }}
                className="glass rounded-2xl p-6 text-center hover:shadow-glow transition-shadow"
              >
                <div className="font-display text-4xl font-bold glow-text mb-1">{s.value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mono">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <div className="mono text-xs uppercase tracking-wider text-primary mb-4">Education Timeline</div>
            <div className="space-y-4">
              {[
                { year: "2023–27", title: "B.E. Computer Science", place: "KSR IET, Namakkal" },
                { year: "2021–23", title: "HSC – Computer Science", place: "Bharani Park HSS • 72%" },
                { year: "2020–21", title: "SSLC", place: "Bharani Park HSS" },
              ].map((e, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="mono text-xs text-primary w-16 shrink-0 pt-1">{e.year}</div>
                  <div className="relative pl-4 border-l border-border group-hover:border-primary transition-colors">
                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary group-hover:shadow-glow" />
                    <div className="font-semibold text-sm">{e.title}</div>
                    <div className="text-xs text-muted-foreground">{e.place}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default About;
