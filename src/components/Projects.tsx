import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "./Section";
import { Eye, FileSearch, NotebookPen, ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    icon: Eye,
    title: "Gaze-Controlled Cursor System",
    description: "A hands-free computer control system using eye-tracking. Implemented blink-to-click with fast response time, making computers accessible to all.",
    tags: ["Python", "OpenCV", "Computer Vision", "AI"],
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    icon: FileSearch,
    title: "AI Resume Checker",
    description: "An AI tool that analyzes resumes and generates ATS scores. Integrated Google Gemini API for intelligent feedback and improvement suggestions.",
    tags: ["Gemini API", "Python", "AI/ML", "NLP"],
    gradient: "from-fuchsia-500 to-purple-600",
  },
  {
    icon: NotebookPen,
    title: "DevNotes",
    description: "A full-stack MERN application for developers to manage notes. Implemented complete CRUD operations and clean REST APIs.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    gradient: "from-emerald-500 to-teal-600",
  },
];

const Projects = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <Section id="projects" eyebrow="My Work" title="Featured Projects" subtitle="A selection of projects where I turned ideas into working products.">
      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -10 }}
            className="group relative glass rounded-3xl p-6 overflow-hidden flex flex-col hover:shadow-elegant transition-all duration-500"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
            <div className={`absolute -top-20 -right-20 w-48 h-48 bg-gradient-to-br ${p.gradient} opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity`} />

            {/* Image-style header */}
            <div className={`relative h-44 rounded-2xl bg-gradient-to-br ${p.gradient} mb-5 overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 opacity-30" style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                backgroundSize: '20px 20px',
              }} />
              <motion.div
                whileHover={{ scale: 1.1, rotate: 8 }}
                className="relative w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center"
              >
                <p.icon className="w-10 h-10 text-white" strokeWidth={1.5} />
              </motion.div>
              <div className="absolute top-3 right-3 mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-black/30 text-white">
                0{i + 1}
              </div>
            </div>

            <h3 className="font-display text-xl font-bold mb-2 relative">{p.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed relative flex-1">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5 relative">
              {p.tags.map((t) => (
                <span key={t} className="text-[10px] mono px-2 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 relative">
              <a href="#" className="flex-1 inline-flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl bg-gradient-primary text-primary-foreground hover:shadow-glow transition-shadow">
                Live Demo <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-primary flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Experience timeline */}
      <div className="mt-20">
        <motion.h3
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="font-display text-2xl md:text-3xl font-bold text-center mb-10"
        >
          Professional <span className="glow-text">Experience</span>
        </motion.h3>
        <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {[
            {
              role: "AI & ML Intern",
              org: "United IT & CADD Divisions",
              points: ["Worked on Machine Learning and Deep Learning using Python", "Hands-on experience in model training and evaluation"],
            },
            {
              role: "Data Analytics Intern",
              org: "Stack & Queue Educations",
              points: ["Built dashboards using Power BI for data visualization", "Performed data processing and analytical reporting"],
            },
          ].map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
              className="glass rounded-2xl p-6 hover:border-primary/40 border-transparent transition-colors"
            >
              <div className="mono text-xs uppercase tracking-wider text-primary mb-2">Internship</div>
              <h4 className="font-display text-lg font-semibold">{e.role}</h4>
              <div className="text-sm text-muted-foreground mb-4">{e.org}</div>
              <ul className="space-y-2">
                {e.points.map((p, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-primary mt-1">▸</span>
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Projects;
