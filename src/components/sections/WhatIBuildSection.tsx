import { Bot, Globe, Server } from "lucide-react";

const items = [
  {
    icon: Bot,
    title: "AI Agent Systems",
    description: "Autonomous agents that research, analyze, and act on complex tasks.",
  },
  {
    icon: Globe,
    title: "Scalable Web Apps",
    description: "Production-grade applications built for performance and growth.",
  },
  {
    icon: Server,
    title: "API-driven Platforms",
    description: "Robust APIs and microservices powering modern digital products.",
  },
];

const WhatIBuildSection = () => {
  return (
    <section id="what-i-build" className="py-xxl px-l max-w-content mx-auto">
      <h2 className="text-center font-heading text-foreground">What I Build</h2>

      <div className="mt-xl grid grid-cols-1 gap-m md:grid-cols-3">
        {items.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-lg border border-border bg-surface p-m text-center transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_16px_hsl(252_100%_68%/0.12)] hover:scale-[1.02]"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Icon size={24} />
            </div>
            <h3 className="mt-m font-heading text-foreground">{title}</h3>
            <p className="mt-s text-sm text-text-secondary">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhatIBuildSection;
