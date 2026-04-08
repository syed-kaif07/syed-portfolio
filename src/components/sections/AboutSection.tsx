import { MapPin, GraduationCap, Target, ArrowUpRight, Linkedin, Github, Zap } from "lucide-react";
import { BorderBeam } from "@/components/ui/borderbeam";
import { motion } from "framer-motion";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  beamDelay?: number;
  style?: React.CSSProperties;
}

const BentoCard = ({ children, className = "", beamDelay = 0, style }: BentoCardProps) => (
  <div
    className={`group relative rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.01] ${className}`}
    style={{
      background: "linear-gradient(145deg, rgba(38,38,38,0.9) 0%, rgba(23,23,23,0.95) 50%, rgb(10,10,10) 100%)",
      boxShadow: "rgba(255,255,255,0.08) 0px 0px 0px 1px",
      ...style,
    }}
  >
    <BorderBeam
      size={120}
      duration={8}
      delay={beamDelay}
      colorFrom="#ffffff"
      colorTo="transparent"
      borderWidth={1}
    />
    {children}
  </div>
);

const AvatarPulse = () => {
  const pulseColor = "#a855f7";
  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: 64, height: 64 }}>
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
        style={{ width: 64, height: 64, borderColor: pulseColor, backgroundColor: "black" }}
      >
        <img
          src="/vegeta.png"
          alt="SK"
          className="w-full h-full object-cover object-top scale-[1.3]"
        />
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-xxl">
      <h2 className="font-heading font-black uppercase tracking-tighter text-foreground text-left text-[4rem] leading-none md:text-[6rem] lg:text-[8rem] mb-8 px-4 md:px-8">
        About Me
      </h2>

      <div className="px-4 md:px-8 mt-xl">

        {/* ── Desktop grid ── */}
        <div
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gridTemplateRows: "320px 280px",
          }}
        >
          {/* Bio — col 1, spans 2 rows */}
          <BentoCard beamDelay={0} style={{ gridColumn: "1", gridRow: "1 / 3" }}>
            <div className="absolute top-0 left-0 w-[70%] h-[50%] rounded-full bg-white/[0.03] blur-[80px] pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-4">
                <AvatarPulse />
                <div className="flex flex-col">
                  <h3 className="text-white text-base font-semibold tracking-tight">Hi, I'm Syed Kaifuddin.</h3>
                  <p className="text-white/50 text-sm font-medium tracking-wide">AI Agent Systems & Full Stack Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a href="https://www.linkedin.com/in/syed-kaifuddin-113955253/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://github.com/syed-kaif07" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="relative z-10 flex-1 px-6 flex flex-col justify-center">
              <h4 className="text-[1.75rem] lg:text-[2.1rem] font-medium text-white leading-[1.15] tracking-tight mb-4">
                Building intelligent systems that drive real-world decisions.
              </h4>
              <p className="text-white/40 text-sm leading-[1.7]">
                A final-year CS student specializing in Data Science. I bridge the gap between advanced AI capabilities and real applications — from multi-agent pipelines to full-stack streaming platforms.
              </p>
            </div>
            <div className="relative z-10 p-6 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-xs font-mono">syedkaifuddin4@gmail.com</span>
                <a href="mailto:syedkaifuddin4@gmail.com" className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:scale-110 active:scale-95 transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </BentoCard>

          {/* Education — col 2, row 1 */}
          <BentoCard beamDelay={2} style={{ gridColumn: "2", gridRow: "1" }}>
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div className="flex items-start justify-between mb-5">
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">Education</span>
                <div className="p-2 rounded-lg border border-white/10 bg-white/5"><GraduationCap className="w-5 h-5 text-white/60" /></div>
              </div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white leading-tight mb-3">CS — Data Science</h3>
              <div className="h-px bg-white/[0.08] mb-4" />
              <p className="text-sm text-white/40 leading-relaxed">Final year Intern @ Kodnest in Python Full Stack Development.</p>
            </div>
          </BentoCard>

          {/* Core Competencies — col 3, row 1 */}
          <BentoCard beamDelay={4} style={{ gridColumn: "3", gridRow: "1" }}>
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div className="flex items-start justify-between mb-5">
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">Skills</span>
                <div className="p-2 rounded-lg border border-white/10 bg-white/5"><Zap className="w-5 h-5 text-white/60" /></div>
              </div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white leading-tight mb-3">Core Competencies</h3>
              <div className="h-px bg-white/[0.08] mb-4" />
              <div className="flex flex-wrap gap-2 mt-auto">
                {["AI Agents", "LLMs", "Next.js", "CrewAI", "Supabase"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60 hover:text-white hover:border-white/25 transition-all cursor-default">{item}</span>
                ))}
              </div>
            </div>
          </BentoCard>

          {/* Location — col 2, row 2 */}
          <BentoCard beamDelay={6} style={{ gridColumn: "2", gridRow: "2" }}>
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div className="flex items-start justify-between mb-5">
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">Location</span>
                <div className="p-2 rounded-lg border border-white/10 bg-white/5"><MapPin className="w-5 h-5 text-white/60" /></div>
              </div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white leading-tight mb-3">Davanagere, India</h3>
              <div className="h-px bg-white/[0.08] mb-4" />
              <p className="text-sm text-white/40 leading-relaxed">Available for remote & on-site opportunities worldwide.</p>
            </div>
          </BentoCard>

          {/* What I'm After — col 3, row 2 */}
          <BentoCard beamDelay={8} style={{ gridColumn: "3", gridRow: "2" }}>
            <div className="relative z-10 p-7 flex flex-col h-full">
              <div className="flex items-start justify-between mb-5">
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">Focus</span>
                <div className="p-2 rounded-lg border border-white/10 bg-white/5"><Target className="w-5 h-5 text-white/60" /></div>
              </div>
              <h3 className="font-heading text-2xl font-black uppercase tracking-tight text-white leading-tight mb-3">What I'm After</h3>
              <div className="h-px bg-white/[0.08] mb-4" />
              <div className="flex flex-wrap gap-2 mt-auto">
                {["GenAI Engineer", "Full Stack Dev", "AI Engineer"].map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60 hover:text-white hover:border-white/25 transition-all cursor-default">{item}</span>
                ))}
              </div>
            </div>
          </BentoCard>
        </div>

        {/* ── Mobile stacked layout ── */}
        <div className="flex flex-col gap-4 md:hidden">

          {/* Bio */}
          <BentoCard beamDelay={0}>
            <div className="absolute top-0 left-0 w-[70%] h-[50%] rounded-full bg-white/[0.03] blur-[80px] pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between p-5 pb-3">
              <div className="flex items-center gap-3">
                <AvatarPulse />
                <div className="flex flex-col">
                  <h3 className="text-white text-sm font-semibold tracking-tight">Hi, I'm Syed Kaifuddin.</h3>
                  <p className="text-white/50 text-xs font-medium">AI Agent & Full Stack Engineer</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a href="https://www.linkedin.com/in/syed-kaifuddin-113955253/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="https://github.com/syed-kaif07" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="relative z-10 px-5 pb-4 flex flex-col">
              <h4 className="text-xl font-medium text-white leading-[1.2] tracking-tight mb-3">
                Building intelligent systems that drive real-world decisions.
              </h4>
              <p className="text-white/40 text-sm leading-[1.6]">
                A final-year CS student specializing in Data Science. Bridging AI capabilities and real applications.
              </p>
            </div>
            <div className="relative z-10 p-5 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-white/30 text-xs font-mono">syedkaifuddin4@gmail.com</span>
                <a href="mailto:syedkaifuddin4@gmail.com" className="flex items-center justify-center w-7 h-7 rounded-full bg-white text-black hover:scale-110 transition-all duration-300">
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </BentoCard>

          {/* Education + Core Competencies side by side */}
          <div className="grid grid-cols-2 gap-4">
            <BentoCard beamDelay={2}>
              <div className="relative z-10 p-5 flex flex-col h-full">
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/50 mb-3">Education</span>
                <h3 className="font-heading text-base font-black uppercase tracking-tight text-white leading-tight mb-2">CS — Data Science</h3>
                <div className="h-px bg-white/[0.08] mb-3" />
                <p className="text-xs text-white/40 leading-relaxed">Final year Intern @ Kodnest.</p>
              </div>
            </BentoCard>

            <BentoCard beamDelay={4}>
              <div className="relative z-10 p-5 flex flex-col h-full">
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/50 mb-3">Skills</span>
                <h3 className="font-heading text-base font-black uppercase tracking-tight text-white leading-tight mb-2">Core</h3>
                <div className="h-px bg-white/[0.08] mb-3" />
                <div className="flex flex-wrap gap-1">
                  {["AI Agents", "LLMs", "Next.js", "FastAPI"].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">{item}</span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>

          {/* Location + Focus side by side */}
          <div className="grid grid-cols-2 gap-4">
            <BentoCard beamDelay={6}>
              <div className="relative z-10 p-5 flex flex-col h-full">
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/50 mb-3">Location</span>
                <h3 className="font-heading text-base font-black uppercase tracking-tight text-white leading-tight mb-2">Davanagere, India</h3>
                <div className="h-px bg-white/[0.08] mb-3" />
                <p className="text-xs text-white/40">Remote & on-site available.</p>
              </div>
            </BentoCard>

            <BentoCard beamDelay={8}>
              <div className="relative z-10 p-5 flex flex-col h-full">
                <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/50 mb-3">Focus</span>
                <h3 className="font-heading text-base font-black uppercase tracking-tight text-white leading-tight mb-2">What I'm After</h3>
                <div className="h-px bg-white/[0.08] mb-3" />
                <div className="flex flex-wrap gap-1">
                  {["GenAI Eng", "Full Stack", "AI/ML"].map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-white/60">{item}</span>
                  ))}
                </div>
              </div>
            </BentoCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;