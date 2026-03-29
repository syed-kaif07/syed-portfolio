const techItems = [
  "Python", "TypeScript", "React", "Next.js", "Node.js",
  "FastAPI", "PostgreSQL", "Docker", "LangChain", "Tailwind CSS",
];

const TechStackSection = () => {
  return (
    <section id="techstack" className="py-xxl">
      <h2 className="text-center font-heading text-foreground">
        Technologies I Work With
      </h2>

      <div className="relative mt-xl overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-m hover:[animation-play-state:paused]">
          {[...techItems, ...techItems].map((tech, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-border bg-surface px-6 py-2 text-sm text-text-secondary transition-all duration-300 hover:border-accent/40 hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
