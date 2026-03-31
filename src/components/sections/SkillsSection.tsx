import { Brain, Server, Monitor, Database, LucideIcon } from "lucide-react";

interface SkillCardProps {
  badge: string;
  title: string;
  icon: LucideIcon;
  skills: string[];
  className?: string;
}

const SkillCard = ({ badge, title, icon: Icon, skills, className = "" }: SkillCardProps) => (
  <div
    className={`group relative rounded-2xl border border-white/10 bg-[#0d0d0d] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:bg-[#111] ${className}`}
  >
    {/* Subtle glow on hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-white/[0.03] to-transparent" />

    <div className="relative z-10 p-6 flex flex-col h-full">
      {/* Top row: badge + icon */}
      <div className="flex items-start justify-between mb-4">
        <span className="inline-block rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-white/50">
          {badge}
        </span>
        <div className="p-2 rounded-lg border border-white/10 bg-white/5 group-hover:border-white/20 transition-colors duration-300">
          <Icon className="w-4 h-4 text-white/60 group-hover:text-white/90 transition-colors duration-300" />
        </div>
      </div>

      {/* Title */}
      <h3 className="font-heading text-xl font-black uppercase tracking-tight text-white leading-tight mb-5">
        {title}
      </h3>

      {/* Divider */}
      <div className="h-px bg-white/8 mb-4" />

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/70 transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-xxl">
      <h2 className="font-heading font-black uppercase tracking-tighter text-foreground text-left text-[4rem] leading-none md:text-[6rem] lg:text-[8rem] mb-4 px-4 md:px-8">
        Skills
      </h2>

      <div className="px-l max-w-content mx-auto mt-xl">
        {/* Bento grid — 3 columns, 2 rows */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 md:auto-rows-[220px]">

          {/* Row 1: Wide (col 1-2) + Square (col 3) */}
          <SkillCard
            badge="AI & ML"
            title="AI Systems"
            icon={Brain}
            skills={["LangChain", "LLM Integration", "RAG Pipelines", "Agent Design"]}
            className="md:col-span-2 md:row-span-1"
          />
          <SkillCard
            badge="Server"
            title="Backend"
            icon={Server}
            skills={["FastAPI", "Node.js", "PostgreSQL", "Redis"]}
            className="md:col-span-1 md:row-span-1"
          />

          {/* Row 2: Square (col 1) + Wide (col 2-3) */}
          <SkillCard
            badge="UI / UX"
            title="Frontend"
            icon={Monitor}
            skills={["React", "Next.js", "TypeScript", "Tailwind CSS"]}
            className="md:col-span-1 md:row-span-1"
          />
          <SkillCard
            badge="Storage"
            title="Database"
            icon={Database}
            skills={["PostgreSQL", "MongoDB", "Supabase", "Prisma"]}
            className="md:col-span-2 md:row-span-1"
          />

        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
