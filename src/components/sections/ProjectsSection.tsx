"use client";
import { useEffect, useRef, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  title: string;
  subtitle: string;
  problem: string;
  solution: string;
  impact: string;
  stack: string[];
  github: string;
  live?: string;
  image?: string;
  video?: string;
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
    github: "https://github.com/syed-kaif07/market-research-crew",
    live: "#",
    video: "/videos/market-research.mp4",
  },
  {
    index: 2,
    title: "AnimeHub",
    subtitle: "Full-Stack Streaming Platform",
    problem: "Existing anime platforms are cluttered and lack clean browsing experience",
    solution: "Built a full-stack streaming platform with clean UI and user personalization",
    impact: "Delivered fast, clean browsing experience with user personalization features.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase"],
    github: "https://github.com/syed-kaif07/animehub",
    video: "/videos/animehub.mp4",
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

// Media with custom animated cursor
function MediaWithPointer({
  project,
  label,
}: {
  project: Project;
  label: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsInside(true)}
      onMouseLeave={() => setIsInside(false)}
      className="overflow-hidden rounded-2xl w-full relative cursor-none"
    >
      {project.video ? (
  <video
    src={project.video}
    autoPlay
    loop
    muted
    playsInline
    className="w-full h-[480px] object-cover rounded-2xl"
    style={{ objectPosition: project.index === 2 ? "top" : "center" }}
  />
) : (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-[480px] object-cover rounded-2xl"
        />
      )}

      <AnimatePresence>
        {isInside && (
          <motion.div
            className="absolute pointer-events-none z-50"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="1"
              viewBox="0 0 16 16"
              className="h-5 w-5 -translate-x-[10px] -translate-y-[8px] -rotate-[70deg] text-white drop-shadow-lg"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
            </svg>
            <div className="mt-1 ml-1 whitespace-nowrap rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 text-xs font-medium text-white shadow-lg">
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Desktop Component
function ProjectsDesktop() {
  const [active, setActive] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = projects.map((_, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { threshold: 0.5 }
      );
      if (sectionRefs.current[i]) observer.observe(sectionRefs.current[i]!);
      return observer;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToProject = (i: number) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex">
      <div className="w-[260px] flex-shrink-0 sticky top-0 h-screen flex flex-col justify-center pl-8 pr-6 z-10">
        <div className="flex flex-col gap-3">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => scrollToProject(i)}
              className="text-left transition-all duration-300"
            >
              <span
                className={
                  "font-heading font-black uppercase tracking-tight leading-tight block transition-all duration-300 " +
                  (active === i
                    ? "text-white text-2xl"
                    : "text-white/25 text-xl hover:text-white/50")
                }
              >
                {p.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        {projects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => (sectionRefs.current[i] = el)}
            className="min-h-screen flex items-center py-16 pr-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col gap-8 w-full"
              >
                <MediaWithPointer project={project} label={project.subtitle} />

                <div className="flex flex-col md:flex-row gap-8 justify-between">
                  <div className="flex flex-col gap-4 md:w-[55%]">
                    <div>
                      <span className="font-mono text-sm text-white/30">
                        {String(project.index).padStart(2, "0")}
                      </span>
                      <h3 className="font-heading font-black uppercase tracking-tight text-white text-4xl leading-none mt-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/40 uppercase tracking-widest mt-2">
                        {project.subtitle}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-base text-white/60">
                        <span className="font-semibold text-white">Problem:</span>{" "}
                        {project.problem}
                      </p>
                      <p className="text-base text-white/60">
                        <span className="font-semibold text-white">Solution:</span>{" "}
                        {project.solution}
                      </p>
                      <p className="text-base text-white/40 italic">
                        {"↳ " + project.impact}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 md:w-[40%]">
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

                    {/* ✅ FIXED LINKS */}
                    <div className="flex items-center gap-6 mt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-all uppercase tracking-wider"
                      >
                        <Github size={15} />
                        <span>GitHub</span>
                      </a>

                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 hover:text-white/70 transition-all uppercase tracking-wider"
                        >
                          <ExternalLink size={15} />
                          <span>View Project</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// Mobile Component
function ProjectCardMobile({ project }: { project: Project }) {
  return (
    <div className="border-t border-border py-10">
      <div className="flex flex-col gap-5">
        <span className="font-mono text-sm text-white/30">
          {String(project.index).padStart(2, "0")}
        </span>
        <h3 className="font-heading font-black uppercase leading-none tracking-tight text-white text-3xl">
          {project.title}
        </h3>
        <p className="text-sm font-medium text-white/40 uppercase tracking-widest">
          {project.subtitle}
        </p>

        <div className="overflow-hidden rounded-lg">
          {project.video ? (
            <video
              src={project.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-[220px] object-cover"
            />
          ) : (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[220px] object-cover"
            />
          )}
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
          <p className="text-base text-white/40 italic">
            {"↳ " + project.impact}
          </p>
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

        {/* ✅ FIXED LINKS */}
        <div className="flex items-center gap-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-white/50 hover:text-white transition-all"
          >
            <Github size={15} />
            <span>GitHub</span>
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4 hover:text-white/70 transition-all"
            >
              <ExternalLink size={15} />
              <span>View Project</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Section
const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-background">
      <div className="px-8 pt-xxl pb-8">
        <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-2">
          [03] Work
        </p>
        <h2 className="font-heading font-black uppercase tracking-tighter text-foreground text-left text-[4rem] leading-none md:text-[6rem] lg:text-[8rem]">
          Projects
        </h2>
      </div>

      <div className="hidden md:block">
        <ProjectsDesktop />
      </div>

      <div className="block md:hidden px-l">
        {projects.map((project) => (
          <ProjectCardMobile key={project.title} project={project} />
        ))}
        <div className="border-t border-border" />
      </div>
    </section>
  );
};

export default ProjectsSection;