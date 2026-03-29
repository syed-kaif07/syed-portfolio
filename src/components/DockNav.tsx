import { useState, useEffect, useCallback } from "react";
import { Home, Layers, FolderOpen, Wrench, Cpu, Mail } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "techstack", label: "Tech Stack", icon: Layers },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "what-i-build", label: "What I Build", icon: Wrench },
  { id: "skills", label: "Skills", icon: Cpu },
  { id: "contact", label: "Contact", icon: Mail },
];

const DockNav = () => {
  const [active, setActive] = useState("hero");

  const handleScroll = useCallback(() => {
    const offsets = navItems.map(({ id }) => {
      const el = document.getElementById(id);
      return { id, top: el ? el.getBoundingClientRect().top : Infinity };
    });
    const current = offsets.reduce((prev, curr) =>
      Math.abs(curr.top) < Math.abs(prev.top) ? curr : prev
    );
    setActive(current.id);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-1 rounded-full border border-accent/10 bg-surface/85 px-3 py-2 backdrop-blur-xl">
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => scrollTo(id)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-accent-foreground scale-110 shadow-[0_0_14px_hsl(252_100%_68%/0.45)]"
                      : "text-muted-foreground hover:text-foreground hover:scale-105"
                  }`}
                  aria-label={label}
                >
                  <Icon size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-surface text-foreground border-border text-sm">
                {label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </nav>
  );
};

export default DockNav;
