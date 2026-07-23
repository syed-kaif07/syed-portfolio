import { Mail, Linkedin, Github, Download } from "lucide-react";
import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const links = [
  { icon: Mail, label: "Email", href: "mailto:syedkaifuddin4@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/syed-kaifuddin-113955253/" },
  { icon: Github, label: "GitHub", href: "https://github.com/syed-kaif07" },
];

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const AvatarPulse = ({ size = 64 }: { size?: number }) => {
  const pulseColor = "#a855f7";
  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: pulseColor }}
        animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: pulseColor }}
        animate={{ scale: [1, 1.8], opacity: [0.35, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: "easeOut" }}
      />
      <div
        className="relative z-10 rounded-full overflow-hidden border-2 flex-shrink-0"
        style={{
          width: size,
          height: size,
          borderColor: pulseColor,
          backgroundColor: "black",
        }}
      >
        <img
          src="/vegeta.png"
          alt="Syed Kaifuddin"
          className="w-full h-full object-cover object-top scale-[1.3]"
        />
      </div>
    </div>
  );
};

const ConnectButton = () => {
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const spinning = useRef(false);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (spinning.current) return;
    spinning.current = true;

    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();

    setRipples((prev) => [...prev, { id, x, y, size }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
      spinning.current = false;
    }, 650);

    window.open("mailto:syedkaifuddin4@gmail.com", "_blank");
  }, []);

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative inline-flex items-center gap-0 overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
      style={{
        borderRadius: "9999px",
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(255,255,255,0.07)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: hovered
          ? "inset 0 1px 0 rgba(255,255,255,0.15), 0 0 28px rgba(255,255,255,0.08), 0 4px 24px rgba(0,0,0,0.4)"
          : "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 24px rgba(0,0,0,0.3)",
        borderColor: hovered ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.15)",
        transition: "box-shadow 0.4s ease, border-color 0.3s ease, transform 0.2s ease",
        padding: "6px 24px 6px 6px",
      }}
    >
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "9999px",
          padding: "1px",
          background:
            "conic-gradient(from var(--beam-angle, 0deg), transparent 0%, transparent 70%, rgba(255,255,255,0.85) 85%, transparent 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: "beam-spin 3s linear infinite",
        }}
      />

      {ripples.map(({ id, x, y, size }) => (
        <span
          key={id}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: size,
            height: size,
            left: x,
            top: y,
            background: "rgba(255,255,255,0.1)",
            animation: "circle-expand 0.6s cubic-bezier(0.22,1,0.36,1) forwards",
          }}
        />
      ))}

      <span
        className="relative z-10 inline-flex items-center justify-center flex-shrink-0"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.92)",
          marginRight: "16px",
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: hovered ? "rotate(-45deg)" : "rotate(0deg)",
            transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <path
            d="M3 9H15M15 9L9 3M15 9L9 15"
            stroke="#000"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <span className="relative z-10 text-white font-semibold" style={{ fontSize: "15px", letterSpacing: "0.01em" }}>
        Connect
      </span>
    </button>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-xxl pb-36 md:pb-xxl">

      <div className="px-4 md:px-8 text-center mb-8">
        <h2 className="font-heading font-black uppercase tracking-tighter text-white text-[4rem] leading-none md:text-[6rem] lg:text-[8rem]">
          Want To Collab?
        </h2>
        <p className="mt-6 text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
          Whether it’s AI agents, intelligent automation, or a full-stack product,<br />
          I build systems that analyze, decide, and execute — end to end.
        </p>
      </div>

      <div className="flex justify-center mt-10 mb-2">
        <ConnectButton />
      </div>

      <div className="flex md:hidden justify-center mt-12">
        <AvatarPulse size={64} />
      </div>

      <div className="px-4 md:px-8 mt-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-10">

        <div className="flex flex-col items-center md:items-start gap-5">
          <p className="text-white/60 text-base">Built with ♥ by Syed Kaifuddin</p>
          <div className="flex items-center gap-3">
            {links.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-white/30 hover:text-white hover:scale-[1.08]"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:flex flex-1 items-end justify-center pb-2">
          <AvatarPulse size={56} />
        </div>

        <div className="flex flex-col items-center md:items-end gap-3">
          <a
            href="https://drive.google.com/file/d/1O9pbF26-y0pjUojD09OmUyxfaxQhfkBz/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.03] min-w-[200px]"
          >
            <Download size={16} />
            Download Resume
          </a> 
          <button
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white/30 cursor-not-allowed min-w-[200px]"
          >
            Get Updates
          </button>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;