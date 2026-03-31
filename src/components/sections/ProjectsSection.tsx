"use client";
import { useRef } from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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

// ── Desktop morphing version ──────────────────────────────────────────────────
function ProjectMorphDesktop({ project }: { project: Project }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 20,
    restDelta: 0.001,
  });

  const heroScale = useTransform(smoothProgress, [0, 0.4], [1, 0.5]);
  const heroX = useTransform(smoothProgress, [0, 0.4], ["0%", "-20%"]);
  const heroBorderRadius = useTransform(smoothProgress, [0, 0.4], ["0rem", "2rem"]);
  const heroTextOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const contentX = useTransform(smoothProgress, [0.3, 0.6], ["100%", "0%"]);
  const contentOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-30" />

      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: heroScale, x: heroX, borderRadius: heroBorderRadius }}
          className="relative z-20 w-full h-full bg-surface shadow-2xl overflow-hidden border border-white/5"
        >
          <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-black/50" />
          <motion.div
            style={{ opacity: heroTextOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center"
          >
            <span className="font-mono text-sm text-white/30 mb-3">
              {String(project.index).padStart(2, "0")}
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-4 text-white">
              {project.title}
            </h2>
            <p className="text-xl font-light text-white/50 uppercase tracking-widest">
              {project.subtitle}
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ x: contentX, opacity: contentOpacity }}
          className="absolute right-[5%] w-[35%] z-10"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-white uppercase tracking-tight">{project.title}</h3>
              <p className="text-sm text-white/40 uppercase tracking-widest mt-1">{project.subtitle}</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-base text-white/60">
                <span className="font-semibold text-white">Problem:</span> {project.problem}
              </p>
              <p className="text-base text-white/60">
                <span className="font-semibold text-white">Solution:</span> {project.solution}
              </p>
              <p className="text-base text-white/40 italic">↳ {project.impact}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-6">
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-all">
                <Github size={15} /> GitHub
              </a>
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4 hover:text-white/70 transition-all">
                  <ExternalLink size={15} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>

        <div className="absolute top-0 right-0 w-1/2 h-full bg-surface/20 z-0" />
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-30" />
    </div>
  );
}

// ── Mobile simple card version ────────────────────────────────────────────────
function ProjectCardMobile({ project }: { project: Project }) {
  return (
    <div className="border-t border-border py-10">
      <div className="flex flex-col gap-5">
        <span className="font-mono text-sm text-white/30">{String(project.index).padStart(2, "0")}</span>
        <h3 className="font-heading font-black uppercase leading-none tracking-tight text-white text-3xl">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-white/40 uppercase tracking-widest">{project.subtitle}</p>

        <div className="overflow-hidden rounded-lg">
          <img src={project.image} alt={project.title} className="w-full h-[220px] object-cover" />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-base text-white/60">
            <span className="font-semibold text-white">Problem:</span> {project.problem}
          </p>
          <p className="text-base text-white/60">
            <span className="font-semibold text-white">Solution:</span> {project.solution}
          </p>
          <p className="text-base text-white/40 italic">↳ {project.impact}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-all">
            <Github size={15} /> GitHub
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4 hover:text-white/70 transition-all">
              <ExternalLink size={15} /> Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  return (
    <section id="projects">
      <div className="py-xxl px-l max-w-content mx-auto">
        <h2 className="font-heading text-foreground mb-4 text-5xl md:text-6xl text-left">Projects</h2>
      </div>

      {/* Desktop — morphing effect */}
      <div className="hidden md:block">
        {projects.map((project) => (
          <ProjectMorphDesktop key={project.title} project={project} />
        ))}
      </div>

      {/* Mobile — simple stacked cards */}
      <div className="block md:hidden px-l max-w-content mx-auto">
        {projects.map((project) => (
          <ProjectCardMobile key={project.title} project={project} />
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ProjectsSection;