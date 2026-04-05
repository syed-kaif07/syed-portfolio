import { MapPin, GraduationCap, Code2, Target } from "lucide-react";
import { BorderBeam } from "@/components/ui/borderbeam";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  beamDelay?: number;
}

const BentoCard = ({ children, className = "", beamDelay = 0 }: BentoCardProps) => (
  <div
    className={`group relative rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden flex flex-col transition-all duration-300 hover:border-white/20 hover:bg-[#111] ${className}`}
  >
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />
    <BorderBeam
      size={120}
      duration={8}
      delay={beamDelay}
      colorFrom="#ffffff"
      colorTo="transparent"
      borderWidth={1}
    />
    <div className="relative z-10 p-8 flex flex-col h-full">
      {children}
    </div>
  </div>
);

const AboutSection = () => {
  return (
    <section id="about" className="py-xxl">
      <h2 className="font-heading font-black uppercase tracking-tighter text-foreground text-left text-[4rem] leading-none md:text-[6rem] lg:text-[8rem] mb-8 px-4 md:px-8">
        About
      </h2>

      <div className="px-4 md:px-8 mt-xl">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3" style={{ gridTemplateRows: "500px 300px" }}>

          {/* Bio — tall, col 1, spans 2 rows */}
          <BentoCard className="md:col-span-1 md:row-span-2" beamDelay={0}>
            <div className="flex items-start justify-between mb-6">
              <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                Bio
              </span>
              <div className="p-2.5 rounded-lg border border-white/10 bg-white/5">
                <Code2 className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-300" />
              </div>
            </div>
            <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-white leading-tight mb-4">
              Hi, I'm Syed Kaifuddin
            </h3>
            <div className="h-px bg-white/[0.08] mb-6" />
            <p className="text-base text-white/60 leading-relaxed mb-5">
              A final-year CS student specializing in Data Science, building intelligent agent workflows and full-stack platforms.
            </p>
            <p className="text-base text-white/60 leading-relaxed mb-5">
              I bridge the gap between AI capabilities and real-world applications — from multi-agent pipelines to streaming platforms.
            </p>
            <p className="text-base text-white/40 leading-relaxed mt-auto">
              Targeting GenAI Engineer, Full Stack Developer & AI/ML roles as a fresher entering the job market.
            </p>
          </BentoCard>

          {/* Location — col 2, row 1 */}
          <BentoCard className="md:col-span-1 md:row-span-1" beamDelay={2}>
            <div className="flex items-start justify-between mb-6">
              <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                Location
              </span>
              <div className="p-2.5 rounded-lg border border-white/10 bg-white/5">
                <MapPin className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-300" />
              </div>
            </div>
            <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-white leading-tight mb-4">
              Hyderabad, India
            </h3>
            <div className="h-px bg-white/[0.08] mb-5" />
            <p className="text-sm text-white/40 leading-relaxed">
              Available for remote & on-site opportunities worldwide.
            </p>
          </BentoCard>

          {/* Education — col 3, row 1 */}
          <BentoCard className="md:col-span-1 md:row-span-1" beamDelay={4}>
            <div className="flex items-start justify-between mb-6">
              <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                Education
              </span>
              <div className="p-2.5 rounded-lg border border-white/10 bg-white/5">
                <GraduationCap className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-300" />
              </div>
            </div>
            <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-white leading-tight mb-4">
              CS — Data Science
            </h3>
            <div className="h-px bg-white/[0.08] mb-5" />
            <p className="text-sm text-white/40 leading-relaxed">
              Final year @ Kodnest. Python Full Stack Development.
            </p>
          </BentoCard>

          {/* Focus — col 2-3, row 2 */}
          <BentoCard className="md:col-span-2 md:row-span-1" beamDelay={6}>
            <div className="flex items-start justify-between mb-6">
              <span className="inline-block rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                Focus
              </span>
              <div className="p-2.5 rounded-lg border border-white/10 bg-white/5">
                <Target className="w-5 h-5 text-white/60 group-hover:text-white/90 transition-colors duration-300" />
              </div>
            </div>
            <h3 className="font-heading text-3xl font-black uppercase tracking-tight text-white leading-tight mb-4">
              What I'm After
            </h3>
            <div className="h-px bg-white/[0.08] mb-5" />
            <div className="flex flex-wrap gap-3 mt-auto">
              {["GenAI Engineer", "Full Stack Developer", "AI/ML Engineer", "Agent Systems", "API Platforms"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70 hover:border-white/25 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;