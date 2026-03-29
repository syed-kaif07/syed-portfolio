import { useState, useEffect } from "react";
import StarsGalaxyBackground from "@/components/StarsGalaxyBackground";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { EyeFollowButton } from "@/components/ui/EyeFollowButton";
import { MinimalButton } from "@/components/ui/PremiumGlowButton";
import { FlickerText } from "@/components/ui/FlickerText";

const roles = [
  "AI Agent Systems",
  "Automation Workflows",
  "API-Driven Platforms",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030305]"
    >
      <StarsGalaxyBackground />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030305]/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_100%)] opacity-60" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white backdrop-blur-md"
        >
          <Sparkles size={14} className="animate-pulse" />
          <span className="font-medium tracking-wide">3+ Real AI Projects Built</span>
        </motion.div>

        {/* Name row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap items-baseline justify-center gap-4"
        >
          {/* Syed — flicker effect */}
          <FlickerText
            text="Syed"
            textColor="#ffffff"
            glowColor="#ffffff"
            animationStyle="electric"
            animationPattern="sync"
            repeatBehavior="loop"
            animationSpeed={0.6}
            glowIntensity={5}
            strokeWidth={2}
            fontSize="clamp(2.5rem, 8vw, 5rem)"
            fontWeight={900}
            fontFamily="Space Grotesk, sans-serif"
            letterSpacing="0.02em"
          />

          {/* Kaifuddin — plain bold white */}
          <span
            style={{
  fontSize: "clamp(2.5rem, 8vw, 5rem)",
  fontWeight: 900,
  fontFamily: "Space Grotesk, sans-serif",
  letterSpacing: "0.02em",
  color: "#ffffff",
  lineHeight: 1,
  textShadow: "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)",
}}
          >
            Kaifuddin
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6 text-xl font-medium text-white/70 md:text-3xl tracking-wide"
        >
          AI Agent Systems &amp; Full Stack Engineer
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-5 h-8 font-heading text-xl text-slate-300/80 md:text-2xl"
        >
          <span>{displayed}</span>
          <span className="ml-[2px] inline-block w-[3px] animate-pulse bg-white align-middle" style={{ height: "1.2em" }} />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-6 max-w-[600px] text-lg text-slate-400 leading-relaxed"
        >
          I build intelligent agent workflows that automate complex tasks and drive real-world decision making.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5"
        >
          <EyeFollowButton
            text="Explore My Work"
            onClick={() => scrollTo("projects")}
            buttonColor="#ffffff"
            textColor="#000000"
            eyeColor="#000000"
            pupilColor="#ffffff"
            eyeCount={2}
            eyeSize={28}
            pupilSize={12}
            eyeGap={5}
            speed={0.12}
            range={6}
            blinking={true}
            blinkingIntensity={2500}
            paddingX={24}
            paddingY={13}
            fontSize={14}
            fontWeight={600}
          />
          <MinimalButton
            text="Contact Me"
            onClick={() => scrollTo("contact")}
            paddingX={32}
            paddingY={14}
            fontSize={14}
            fontWeight={500}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;