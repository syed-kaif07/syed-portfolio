import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{
        background: "#080808",
        height: "100dvh",
      }}
    >
      {/* ── SYED Logo – top left ─────────────────────────────── */}
      <motion.a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          window.location.reload();
        }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="hidden sm:block absolute top-4 left-6 md:top-6 md:left-10 z-30 cursor-pointer"
        aria-label="Home"
      >
        <img
          src="/syed-logo.png"
          alt="SYED logo"
          className="h-10 sm:h-16 md:h-24 w-auto object-contain"
          style={{
            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.15))",
          }}
        />
      </motion.a>

      {/* ── Vignette overlays — blend image edges into bg ───── */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, transparent 40%, #080808 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, transparent 40%, rgba(8,8,8,0.6) 65%, #080808 90%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 sm:h-24"
        style={{
          background:
            "linear-gradient(to bottom, #080808 0%, transparent 100%)",
        }}
      />

      {/* ── Hero character — full bleed background image ────── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        {/*
          Art-direction swap:
          • < 1024px  → portrait (mobile.jpg)  — covers viewport
          • ≥ 1024px  → landscape (desktop.png) — covers viewport
        */}
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="/hero-character.png"
          />
          <img
            src="/hero-character-mobile.jpg"
            alt="Syed Kaifuddin – hero portrait"
            draggable={false}
            className="select-none"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 20%",
            }}
          />
        </picture>
      </motion.div>


    </section>
  );
};

export default HeroSection;