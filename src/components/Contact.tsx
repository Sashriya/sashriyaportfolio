import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { useInView } from "react-intersection-observer";
import Section from "./Section";
import { Mail, Phone, Send, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Contact = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message ready! Opening your email client…");
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:sashriya.murali@gmail.com?subject=${subject}&body=${body}`;
  };

  const contacts = [
    { icon: Mail, label: "Email", value: "sashriya.murali@gmail.com", href: "mailto:sashriya.murali@gmail.com" },
    { icon: Phone, label: "Phone", value: "+91 9443176161", href: "tel:+919443176161" },
    { icon: LinkedinIcon, label: "LinkedIn", value: "Connect with me", href: "#" },
    { icon: GithubIcon, label: "GitHub", value: "View my work", href: "#" },
  ];

  return (
    <Section id="contact" eyebrow="Get In Touch" title="Let's Build Together" subtitle="Have a project in mind or just want to say hi? I'd love to hear from you.">
      <div ref={ref} className="grid lg:grid-cols-[1fr_1.2fr] gap-8 max-w-6xl mx-auto">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs mono uppercase tracking-wider text-muted-foreground">Based in</div>
                <div className="font-semibold">Namakkal, Tamil Nadu, India</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Open to remote opportunities, internships, and freelance projects worldwide.
            </p>
          </motion.div>

          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ x: 6 }}
              className="group flex items-center gap-4 glass rounded-2xl p-4 hover:border-primary/40 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 group-hover:bg-gradient-primary group-hover:border-transparent flex items-center justify-center transition-all">
                <c.icon className="w-4 h-4 group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs mono uppercase tracking-wider text-muted-foreground">{c.label}</div>
                <div className="text-sm font-semibold truncate">{c.value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-3xl p-7 md:p-9 relative overflow-hidden"
        >
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />

          <h3 className="font-display text-2xl font-bold mb-1 relative">Send a message</h3>
          <p className="text-sm text-muted-foreground mb-6 relative">I usually respond within 24 hours.</p>

          <div className="space-y-4 relative">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs mono uppercase tracking-wider text-muted-foreground mb-2 block">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs mono uppercase tracking-wider text-muted-foreground mb-2 block">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs mono uppercase tracking-wider text-muted-foreground mb-2 block">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                placeholder="Tell me about your project…"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-primary text-primary-foreground font-semibold shadow-glow hover:shadow-glow-secondary transition-shadow"
            >
              Send Message <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.form>
      </div>

      <footer className="mt-24 text-center text-xs mono text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-border" />
          Designed & built with <span className="text-primary">♥</span> by Sashriya M
          <span className="w-8 h-[1px] bg-border" />
        </div>
        <div className="mt-2">© {new Date().getFullYear()} All rights reserved.</div>
      </footer>
    </Section>
  );
};

export default Contact;
