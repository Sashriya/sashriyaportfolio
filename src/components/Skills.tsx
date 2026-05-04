import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "./Section";
import { Code, Globe, Database, Brain, BarChart3, Wrench, Palette } from "lucide-react";

const skillGroups = [
  { icon: Code, title: "Programming", color: "from-cyan-400 to-blue-500", items: ["C", "Java", "Python"] },
  { icon: Globe, title: "Web Development", color: "from-fuchsia-400 to-pink-500", items: ["HTML5", "CSS3", "TailwindCSS", "JavaScript", "React.js", "Node.js", "Express.js", "REST APIs", "Bootstrap"] },
  { icon: Database, title: "Databases", color: "from-emerald-400 to-teal-500", items: ["MySQL", "MongoDB"] },
  { icon: Brain, title: "AI / ML", color: "from-violet-400 to-purple-500", items: ["Machine Learning", "Gemini API"] },
  { icon: BarChart3, title: "Data Tools", color: "from-amber-400 to-orange-500", items: ["Power BI", "Data Analysis"] },
  { icon: Wrench, title: "Dev Tools", color: "from-sky-400 to-indigo-500", items: ["Git", "GitHub"] },
  { icon: Palette, title: "Design", color: "from-rose-400 to-red-500", items: ["Adobe InDesign", "Photoshop"] },
];

const marqueeSkills = ["React.js", "Node.js", "Python", "MongoDB", "Express.js", "TailwindCSS", "Java", "Gemini API", "Power BI", "MySQL", "Git", "JavaScript", "REST APIs", "Machine Learning"];

const Skills = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section id="skills" eyebrow="What I Do" title="Skills & Stack" subtitle="The technologies and tools I use to bring ideas to life.">
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {skillGroups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative glass rounded-3xl p-6 overflow-hidden hover:border-primary/40 transition-all"
          >
            <div className={`absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br ${g.color} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity`} />
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${g.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
              <g.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-display font-semibold text-xl mb-3 relative">{g.title}</h3>
            <div className="flex flex-wrap gap-2 relative">
              {g.items.map((item, j) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: i * 0.08 + j * 0.03 }}
                  className="text-xs mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-colors cursor-default"
                >
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden glass rounded-2xl py-5">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...marqueeSkills, ...marqueeSkills].map((s, i) => (
            <span key={i} className="font-display text-2xl md:text-3xl font-semibold text-muted-foreground hover:text-primary transition-colors cursor-default">
              {s} <span className="text-primary mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Skills;
