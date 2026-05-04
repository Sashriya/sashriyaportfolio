import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Section from "./Section";
import { Award, BookOpen, Users, Trophy } from "lucide-react";

const certs = [
  {
    icon: BookOpen,
    title: "Sustainable Happiness & Cloud Computing",
    issuer: "NPTEL",
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: Award,
    title: "Full Stack Web Development",
    issuer: "HDFD Certification",
    color: "from-fuchsia-400 to-pink-500",
  },
  {
    icon: Users,
    title: "Active Member – 2024",
    issuer: "Google Developer Groups (GDG)",
    color: "from-emerald-400 to-teal-500",
  },
];

const Certifications = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <Section id="certifications" eyebrow="Recognition" title="Certifications & Achievements" subtitle="Continuously learning and growing through certifications and community.">
      <div ref={ref} className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {certs.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -8, rotateX: 5, rotateY: 5 }}
            style={{ perspective: 1000 }}
            className="group relative glass rounded-3xl p-7 overflow-hidden hover:shadow-glow transition-shadow"
          >
            <div className={`absolute -top-16 -right-16 w-44 h-44 bg-gradient-to-br ${c.color} opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity`} />

            {/* Trophy ribbon corner */}
            <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
              <div className={`absolute top-3 -right-8 w-28 rotate-45 bg-gradient-to-r ${c.color} text-center text-[9px] mono uppercase tracking-wider py-1 text-white font-bold`}>
                Certified
              </div>
            </div>

            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform`}>
              <c.icon className="w-7 h-7 text-white" />
            </div>

            <h3 className="font-display text-lg font-bold mb-2 relative leading-tight">
              {c.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground relative">
              <Trophy className="w-3.5 h-3.5 text-primary" />
              <span className="mono text-xs">{c.issuer}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Certifications;
