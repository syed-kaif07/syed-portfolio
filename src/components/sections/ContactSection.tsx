import { Mail, Linkedin, Github, Download } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:syedkaifuddin4@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/syed-kaifuddin-113955253/" },
  { icon: Github, label: "GitHub", href: "https://github.com/syed-kaif07" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-xxl">
      <h2 className="font-heading font-black uppercase tracking-tighter text-foreground text-left text-[4rem] leading-none md:text-[6rem] lg:text-[8rem] mb-4 px-4 md:px-8">
        Contact
      </h2>
      <div className="px-l max-w-content mx-auto">
        <p className="mt-m max-w-md text-text-secondary">
          Open to opportunities, collaborations, and interesting conversations.
        </p>

        <div className="mt-xl flex items-center gap-l">
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface text-text-secondary transition-all duration-300 hover:border-accent hover:text-accent hover:scale-[1.08] hover:shadow-[0_0_16px_hsl(252_100%_68%/0.15)]"
              aria-label={label}
            >
              <Icon size={22} />
            </a>
          ))}
        </div>

        <div className="mt-xl flex flex-wrap items-center gap-4">
          {/* Download Resume */}
          <a
            href="https://drive.google.com/file/d/1z6oIp9furtM9DjhZzzx315JouoTwZIlA/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.03]"
          >
            <Download size={16} />
            Download Resume
          </a>

          {/* Get Updates — disabled for now */}
          <button
            disabled
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/30 cursor-not-allowed"
          >
            Get Updates
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;