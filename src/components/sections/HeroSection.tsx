import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Starts muted for autoplay compliance
  const [isNearHero, setIsNearHero] = useState(false);
  const [userHasInteracted, setUserHasInteracted] = useState(false);

  // Intersection Observer to track scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearHero(entry.isIntersecting);
      },
      { threshold: 0.2 } // Fades / starts when 20% of hero is in view
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Fade helper to smoothly transition volume in/out
  const fadeVolume = (targetVolume: number, duration: number = 800) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (targetVolume > 0 && audio.paused) {
      audio.volume = 0;
      audio.play().catch(() => {});
    }

    const startVolume = audio.volume;
    const difference = targetVolume - startVolume;
    const stepCount = 20;
    const stepTime = duration / stepCount;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / stepCount;
      const volume = startVolume + difference * progress;
      audio.volume = Math.max(0, Math.min(1, volume));

      if (currentStep >= stepCount) {
        audio.volume = targetVolume;
        if (targetVolume === 0) {
          audio.pause();
        }
        clearInterval(interval);
      }
    }, stepTime);
  };

  // Play audio safely handling browser autoplay restrictions
  const playAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.play()
      .then(() => {
        setIsPlaying(true);
        setIsMuted(false);
        audio.volume = 1;
      })
      .catch((err) => {
        console.log("Autoplay deferred. Waiting for click interaction.", err);
      });
  };

  // Click handler to toggle play/mute manually
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setUserHasInteracted(true);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsMuted(true);
    } else {
      audio.volume = 1;
      audio.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch(() => {});
    }
  };

  // Auto-play / fade-in logic based on scrolling & interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isNearHero) {
      // If user has interacted, play it immediately (or fade it in)
      if (userHasInteracted && !isMuted) {
        fadeVolume(1, 800);
        setIsPlaying(true);
      } else if (!userHasInteracted) {
        // Attempt autoplay on page load/enter
        playAudio();
      }
    } else {
      // Scroll out of view: fade out volume to 0
      if (isPlaying) {
        fadeVolume(0, 800);
        setIsPlaying(false);
      }
    }
  }, [isNearHero, userHasInteracted, isMuted]);

  // General click listener to catch first interaction
  useEffect(() => {
    if (userHasInteracted) return;

    const handleFirstInteraction = () => {
      setUserHasInteracted(true);
      if (isNearHero) {
        playAudio();
      }
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isNearHero, userHasInteracted]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden"
      style={{
        background: "#080808",
        height: "100dvh",
      }}
    >
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/hero-music.mp3"
        loop
      />

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

      {/* ── Audio Control Button ────────────────────────────── */}
      <motion.button
        onClick={togglePlay}
        className="absolute bottom-4 right-4 sm:bottom-4 sm:right-6 md:bottom-6 md:right-10 z-40 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white shadow-lg cursor-pointer transition-all duration-300 active:scale-95"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        aria-label="Toggle Background Music"
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-white animate-pulse" />
        ) : (
          <VolumeX className="w-5 h-5 text-white/60" />
        )}
      </motion.button>

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