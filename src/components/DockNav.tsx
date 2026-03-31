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
      <div
        className="flex items-center gap-1 rounded-full px-3 py-2"
        style={{
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {navItems.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => scrollTo(id)}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300"
                  style={
                    isActive
                      ? {
                          background: "rgba(255, 255, 255, 0.95)",
                          color: "#000000",
                          transform: "scale(1.1)",
                          boxShadow: "0 0 16px rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.3)",
                        }
                      : {
                          background: "transparent",
                          color: "rgba(255,255,255,0.4)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(255,255,255,0.4)";
                      e.currentTarget.style.transform = "scale(1)";
                    }
                  }}
                  aria-label={label}
                >
                  <Icon size={18} />
                </button>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="text-sm"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "#ffffff",
                }}
              >
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