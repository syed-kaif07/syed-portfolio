import { Github, ExternalLink } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  github: string;
  live?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Market Research Crew",
    subtitle: "Multi-Agent AI System",
    problem: "Manual research and content generation workflows are slow and inconsistent",
    solution: "Built a 5-agent AI pipeline that automates research, analysis, and reporting",
    impact: "Reduced manual research effort and automated structured insights generation.",
    stack: ["Python", "CrewAI", "Groq LLaMA 3.3", "Streamlit", "YAML"],
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "AnimeHub",
    subtitle: "Full-Stack Streaming Platform",
    problem: "Existing anime platforms are cluttered and lack clean browsing experience",
    solution: "Built a full-stack streaming platform with clean UI and user personalization",
    impact: "Delivered fast, clean browsing experience with user personalization features.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
    github: "#",
  },
  {
    title: "Travel AI",
    subtitle: "AI-Powered Itinerary Generator",
    problem: "Users struggle to create personalized travel plans based on preferences",
    solution: "Built a system that generates dynamic travel itineraries using APIs",
    impact: "Generated personalized itineraries instantly based on user preferences.",
    stack: ["HTML", "CSS", "JavaScript", "Django", "APIs"],
    github: "#",
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div
    className={`flex flex-col justify-between rounded-lg border border-border bg-surface p-[24px] transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_20px_hsl(252_100%_68%/0.15)] hover:scale-[1.02] ${
      project.featured ? "md:col-span-2 md:p-[32px]" : ""
    }`}
  >
    <div className="flex flex-col gap-4">
      <div>
        <h3 className={`font-heading text-foreground ${project.featured ? "text-2xl" : ""}`}>
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-accent/80 font-medium">{project.subtitle}</p>
      </div>

      <p className="text-sm text-text-secondary">
        <span className="font-medium text-foreground">Problem:</span>{" "}
        {project.problem}
      </p>
      <p className="text-sm text-text-secondary">
        <span className="font-medium text-foreground">Solution:</span>{" "}
        {project.solution}
      </p>
      <p className="text-sm text-accent/70 italic">
        ↳ {project.impact}
      </p>

      <div className="flex flex-wrap gap-2 pt-1">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-border bg-background px-3 py-1 text-xs text-text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    <div className="mt-6 flex items-center gap-m">
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 text-sm font-medium text-text-secondary transition-all duration-300 hover:text-foreground hover:drop-shadow-[0_0_6px_hsl(252_100%_68%/0.4)]"
      >
        <Github size={16} /> GitHub
      </a>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm font-medium text-accent transition-all duration-300 hover:text-accent hover:drop-shadow-[0_0_8px_hsl(252_100%_68%/0.5)]"
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      )}
    </div>
  </div>
);

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-xxl">
      <h2 className="text-center font-heading text-foreground">Projects</h2>

      <div className="mt-xl grid grid-cols-1 gap-m md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
