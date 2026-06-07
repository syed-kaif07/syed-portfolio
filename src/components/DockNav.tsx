"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type NavItem = {
  name: string;
  href: string;
};

const items: NavItem[] = [
  { name: "About", href: "#hero" },
  { name: "Tech", href: "#techstack" },
  { name: "Projects", href: "#projects" },
  { name: "Builds", href: "#what-i-build" },
];

const WavyNavLink = ({
  name,
  href,
  isActive,
  onClick,
}: {
  name: string;
  href: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Split name into characters
  const characters = Array.from(name);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative px-2.5 py-1.5 text-sm sm:text-base font-medium uppercase transition-colors duration-300 whitespace-nowrap cursor-pointer select-none",
        isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
      )}
      style={{ fontFamily: "'Oswald', sans-serif" }}
    >
      <span className="flex overflow-hidden">
        {characters.map((char, i) => (
          <motion.span
            key={i}
            style={{ display: "inline-block" }}
            animate={
              isHovered
                ? {
                    y: [0, -6, 0],
                  }
                : {
                    y: 0,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 731,
              damping: 52,
              mass: 2.2,
              delay: i * 0.02,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>

      {/* Wavy Nav Link Underline */}
      <motion.div
        className="absolute bottom-0 left-1.5 right-1.5 h-[2px] bg-white rounded-full origin-center"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isActive || isHovered
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          delay: 0,
          duration: 0.4,
          ease: [0.44, 0, 0.56, 1],
        }}
      />
    </a>
  );
};

const DockNav = () => {
  const [active, setActive] = useState(items[0].name);

  const handleScroll = useCallback(() => {
    const offsets = items.map((item) => {
      const id = item.href.substring(1);
      const el = document.getElementById(id);
      return { name: item.name, top: el ? el.getBoundingClientRect().top : Infinity };
    });
    const current = offsets.reduce((prev, curr) =>
      Math.abs(curr.top) < Math.abs(prev.top) ? curr : prev
    );
    setActive(current.name);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    // Reset scroll to top on refresh
    window.scrollTo({ top: 0 });
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  const scrollTo = (href: string) => {
    const id = href.substring(1);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2 flex items-center justify-center gap-1 sm:gap-2 p-1.5 max-w-[95vw] overflow-x-auto no-scrollbar">
      {items.map((item) => (
        <WavyNavLink
          key={item.name}
          name={item.name}
          href={item.href}
          isActive={active === item.name}
          onClick={(e) => {
            e.preventDefault();
            setActive(item.name);
            scrollTo(item.href);
          }}
        />
      ))}
    </nav>
  );
};

export default DockNav;