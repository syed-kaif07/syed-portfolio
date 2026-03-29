const skillGroups = [
  {
    category: "AI Systems",
    skills: ["LangChain", "LLM Integration", "RAG Pipelines", "Agent Design"],
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Node.js", "PostgreSQL", "Redis"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Supabase", "Prisma"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-xxl">
      <h2 className="text-center font-heading text-foreground">Skills</h2>

      <div className="mt-xl grid grid-cols-1 gap-m sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map(({ category, skills }) => (
          <div
            key={category}
            className="rounded-lg border border-border bg-surface p-m transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_16px_hsl(252_100%_68%/0.12)] hover:scale-[1.02]"
          >
            <h3 className="font-heading text-lg text-accent">{category}</h3>
            <ul className="mt-m space-y-2">
              {skills.map((skill) => (
                <li key={skill} className="text-sm text-text-secondary">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
