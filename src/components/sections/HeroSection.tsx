import StarsGalaxyBackground from "@/components/StarsGalaxyBackground";
import { motion } from "framer-motion";
import { EyeFollowButton } from "@/components/ui/EyeFollowButton";
import { FlickerText } from "@/components/ui/FlickerText";

// ── Shiny Text ────────────────────────────────────────────────────────────────
const ShinyText = ({
  children,
  speed = 3,
}: {
  children: React.ReactNode;
  speed?: number;
}) => (
  <>
    <style>{`
      @keyframes shine {
        0%   { background-position: 100%; }
        100% { background-position: -100%; }
      }
      .shiny-text {
        background: linear-gradient(
          120deg,
          rgba(255,255,255,0.3) 0%,
          rgba(255,255,255,0.3) 40%,
          rgba(255,255,255,1)   50%,
          rgba(255,255,255,0.3) 60%,
          rgba(255,255,255,0.3) 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        color: transparent;
        animation: shine ${speed}s linear infinite;
      }

      @media (min-width: 768px) {
        .cta-wrapper > div {
          padding-left: 48px !important;
          padding-right: 48px !important;
        }
      }
    `}</style>
    <span className="shiny-text">{children}</span>
  </>
);
// ─────────────────────────────────────────────────────────────────────────────

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#030305]"
    >
      <StarsGalaxyBackground />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#030305]/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030305_100%)] opacity-60" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full">

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="flex flex-wrap items-baseline justify-center gap-4"
        >
          <FlickerText
            text="SYED"
            textColor="#ffffff"
            glowColor="#ffffff"
            animationStyle="electric"
            animationPattern="sync"
            repeatBehavior="loop"
            animationSpeed={0.6}
            glowIntensity={4}
            strokeWidth={2}
            fontSize="clamp(2.5rem, 8vw, 5rem)"
            fontWeight={900}
            fontFamily="Space Grotesk, sans-serif"
            letterSpacing="0.02em"
          />
          <span
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 900,
              fontFamily: "Space Grotesk, sans-serif",
              letterSpacing: "0.02em",
              color: "#ffffff",
              lineHeight: 1,
              textShadow:
                "0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.4)",
            }}
          >
            KAIFUDDIN
          </span>
        </motion.div>

        {/* Subtitle — pill badge with shiny text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-6"
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(8px)",
              fontSize: "clamp(0.7rem, 3.5vw, 1.2rem)",
              fontWeight: 500,
              letterSpacing: "0.03em",
              whiteSpace: "nowrap",
            }}
          >
            <ShinyText speed={3}>
              AI Agents • Full Stack • CrewAI • LLM's
            </ShinyText>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-5 max-w-[1300px] text-2xl md:text-4xl font-normal text-white leading-tight tracking-tight"
        >
          I build intelligent agent workflows that automate complex tasks and
          drive real-world decision making.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-10 cta-wrapper"
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
            fontSize={18}
            fontWeight={500}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;