import { Mail, Linkedin, Github } from "lucide-react";

const links = [
  { icon: Mail, label: "Email", href: "mailto:hello@syedkaifuddin.dev" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/syedkaifuddin" },
  { icon: Github, label: "GitHub", href: "https://github.com/syedkaifuddin" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-xxl">
      <h2 className="text-center font-heading text-foreground">Get In Touch</h2>
      <p className="mx-auto mt-m max-w-md text-center text-text-secondary">
        Open to opportunities, collaborations, and interesting conversations.
      </p>

      <div className="mt-xl flex items-center justify-center gap-l">
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
    </section>
  );
};

export default ContactSection;
