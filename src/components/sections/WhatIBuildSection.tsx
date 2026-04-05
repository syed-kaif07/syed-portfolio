import { useState } from "react";
import { Bot, Globe, Server, LucideIcon } from "lucide-react";
import { BorderBeam } from "@/components/ui/borderbeam";

const items = [
  {
    icon: Bot,
    title: "AI Agent Systems",
    description: "Autonomous agents that research, analyze, and act on complex tasks.",
    gradient: "radial-gradient(ellipse at top left, rgba(168,85,247,0.18) 0%, transparent 65%)",
    iconColor: "text-purple-400",
    glowShadow: "0 0 55px rgba(168,85,247,0.22), 0 0 20px rgba(168,85,247,0.12)",
    beamDelay: 0,
  },
  {
    icon: Globe,
    title: "Scalable Web Apps",
    description: "Production-grade applications built for performance and growth.",
    gradient: "radial-gradient(ellipse at top left, rgba(59,130,246,0.18) 0%, transparent 65%)",
    iconColor: "text-blue-400",
    glowShadow: "0 0 55px rgba(59,130,246,0.22), 0 0 20px rgba(59,130,246,0.12)",
    beamDelay: 2,
  },
  {
    icon: Server,
    title: "API-driven Platforms",
    description: "Robust APIs and microservices powering modern digital products.",
    gradient: "radial-gradient(ellipse at top left, rgba(20,184,166,0.18) 0%, transparent 65%)",
    iconColor: "text-teal-400",
    glowShadow: "0 0 55px rgba(20,184,166,0.22), 0 0 20px rgba(20,184,166,0.12)",
    beamDelay: 4,
  },
];

interface BuildCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  iconColor: string;
  glowShadow: string;
  beamDelay: number;
}

const BuildCard = ({ icon: Icon, title, description, gradient, iconColor, glowShadow, beamDelay }: BuildCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl border border-white/15 bg-[#080808] overflow-hidden p-10 flex flex-col gap-8 min-h-[280px]"
      style={{
        backgroundImage: gradient,
        boxShadow: hovered ? glowShadow : "none",
        borderColor: hovered ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.15)",
        transition: "box-shadow 0.4s ease, border-color 0.3s ease",
      }}
    >
      <BorderBeam
        size={80}
        duration={8}
        delay={beamDelay}
        colorFrom="#ffffff"
        colorTo="transparent"
        borderWidth={1}
      />

      {/* Icon */}
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${iconColor}`}>
        <Icon size={24} />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="font-heading text-xl font-semibold text-white leading-snug">
          {title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

const WhatIBuildSection = () => {
  return (
    <section id="what-i-build" className="py-xxl">
      <h2 className="font-heading font-black uppercase tracking-tighter text-foreground text-left text-[4rem] leading-none md:text-[6rem] lg:text-[8rem] mb-4 px-4 md:px-8">
        What I Build
      </h2>

      <div className="px-l max-w-content mx-auto">
        <div className="mt-xl grid grid-cols-1 gap-m md:grid-cols-3">
          {items.map((item) => (
            <BuildCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIBuildSection;