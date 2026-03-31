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
  image: string;
  index: number;
  reverse?: boolean;
}

const projects: Project[] = [
  {
    index: 1,
    title: "Market Research Crew",
    subtitle: "Multi-Agent AI System",
    problem: "Manual research and content generation workflows are slow and inconsistent",
    solution: "Built a 5-agent AI pipeline that automates research, analysis, and reporting",
    impact: "Reduced manual research effort and automated structured insights generation.",
    stack: ["Python", "CrewAI", "Groq LLaMA 3.3", "Streamlit", "YAML"],
    github: "#",
    live: "#",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  },
  {
    index: 2,
    title: "AnimeHub",
    subtitle: "Full-Stack Streaming Platform",
    problem: "Existing anime platforms are cluttered and lack clean browsing experience",
    solution: "Built a full-stack streaming platform with clean UI and user personalization",
    impact: "Delivered fast, clean browsing experience with user personalization features.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
    github: "#",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
    reverse: true,
  },
  {
    index: 3,
    title: "Travel AI",
    subtitle: "AI-Powered Itinerary Generator",
    problem: "Users struggle to create personalized travel plans based on preferences",
    solution: "Built a system that generates dynamic travel itineraries using APIs",
    impact: "Generated personalized itineraries instantly based on user preferences.",
    stack: ["HTML", "CSS", "JavaScript", "Django", "APIs"],
    github: "#",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80",
  },
];

const ProjectRow = ({ project }: { project: Project }) => (
  <div className="group border-t border-border py-12">
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-start ${project.reverse ? "md:[direction:rtl]" : ""}`}>

      {/* Left col — title + problem + solution */}
      <div className="flex flex-col gap-5" style={{ direction: "ltr" }}>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-sm text-white/30">
            {String(project.index).padStart(2, "0")}
          </span>
          <h3
            className="font-heading font-black uppercase leading-none tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            {project.title}
          </h3>
          <p className="text-sm font-medium text-white/40 uppercase tracking-widest mt-1">
            {project.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-base text-white/60">
            <span className="font-semibold text-white">Problem:</span>{" "}
            {project.problem}
          </p>
          <p className="text-base text-white/60">
            <span className="font-semibold text-white">Solution:</span>{" "}
            {project.solution}
          </p>
          <p className="text-base text-white/40 italic">↳ {project.impact}</p>
        </div>
      </div>

      {/* Right col — image + stack + links */}
      <div className="flex flex-col gap-4" style={{ direction: "ltr" }}>
        <div className="overflow-hidden rounded-lg">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white/50 transition-all hover:text-white"
          >
            <Github size={15} /> GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4 transition-all hover:text-white/70"
            >
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>

    </div>
  </div>
);

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-xxl px-l max-w-content mx-auto">
      <h1 className="font-heading text-foreground mb-4">Projects</h1>

      <div className="flex flex-col">
        {projects.map((project) => (
          <ProjectRow key={project.title} project={project} />
        ))}
      </div>

      <div className="border-t border-border" />
    </section>
  );
};

export default ProjectsSection;