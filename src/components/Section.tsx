import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const Section = ({ id, eyebrow, title, subtitle, children }: Props) => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section id={id} ref={ref} className="relative py-24 md:py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          {eyebrow && (
            <div className="mono text-xs uppercase tracking-[0.3em] text-primary mb-4">
              <span className="inline-block w-8 h-[1px] bg-primary align-middle mr-3" />
              {eyebrow}
              <span className="inline-block w-8 h-[1px] bg-primary align-middle ml-3" />
            </div>
          )}
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            {title.split(' ').map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="inline-block mr-3"
              >
                {i === title.split(' ').length - 1 ? (
                  <span className="glow-text">{w}</span>
                ) : (
                  w
                )}
              </motion.span>
            ))}
          </h2>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-muted-foreground max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
};

export default Section;
