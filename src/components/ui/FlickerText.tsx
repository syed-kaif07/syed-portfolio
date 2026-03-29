import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useInView } from "framer-motion"

interface FlickerTextProps {
  text?: string
  textColor?: string
  glowColor?: string
  animationSpeed?: number
  animationPattern?: "sequential" | "random" | "sync"
  repeatBehavior?: "once" | "loop"
  animationStyle?: "neon" | "led" | "retro" | "electric"
  strokeWidth?: number
  glowIntensity?: number
  fontSize?: string
  fontFamily?: string
  fontWeight?: string | number
  letterSpacing?: string
}

export function FlickerText({
  text = "Syed Kaifuddin",
  textColor = "#FFFFFF",
  glowColor = "#FFFFFF",
  animationSpeed = 1,
  animationPattern = "sequential",
  repeatBehavior = "loop",
  animationStyle = "neon",
  strokeWidth = 2,
  glowIntensity = 10,
  fontSize = "inherit",
  fontFamily = "Space Grotesk, sans-serif",
  fontWeight = 900,
  letterSpacing = "0.02em",
}: FlickerTextProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false })

  const characters = useMemo(() => {
    return text.split("").map((char, index) => ({
      char: char === " " ? "\u00a0" : char,
      index,
      id: `${char}-${index}`,
    }))
  }, [text])

  const baseDelay = 0.1 / animationSpeed
  const flickerDuration = 0.3 / animationSpeed
  const totalDuration = characters.length * baseDelay + flickerDuration

  const getAnimationDelay = (index: number) => {
    switch (animationPattern) {
      case "sequential": return index * baseDelay
      case "random": return Math.random() * (totalDuration * 0.7)
      case "sync": return 0
      default: return index * baseDelay
    }
  }

  const getStyleVariation = () => {
    switch (animationStyle) {
      case "neon": return { filter: `drop-shadow(0 0 ${glowIntensity}px ${glowColor})` }
      case "led": return { filter: `drop-shadow(0 0 ${glowIntensity * 0.5}px ${glowColor})` }
      case "retro": return { filter: `drop-shadow(0 0 ${glowIntensity * 1.5}px ${glowColor}) contrast(1.2)` }
      case "electric": return { filter: `drop-shadow(0 0 ${glowIntensity * 2}px ${glowColor}) brightness(1.1)` }
      default: return {}
    }
  }

  useEffect(() => {
    if (isInView) setIsPlaying(true)
  }, [isInView])

  const characterVariants = {
    initial: {
      opacity: 1,
      color: textColor,
      WebkitTextStroke: `${strokeWidth}px transparent`,
    },
    flicker: (index: number) => ({
      opacity: [1, 0.3, 1, 0.1, 1, 0.7, 1],
      color: [textColor, "transparent", textColor, "transparent", textColor],
      WebkitTextStroke: [
        `${strokeWidth}px transparent`,
        `${strokeWidth}px ${textColor}`,
        `${strokeWidth}px transparent`,
        `${strokeWidth}px ${textColor}`,
        `${strokeWidth}px transparent`,
      ],
      transition: {
        duration: flickerDuration,
        delay: getAnimationDelay(index),
        ease: "easeInOut",
        repeat: repeatBehavior === "loop" ? Infinity : 0,
        repeatDelay: repeatBehavior === "loop" ? totalDuration : 0,
      },
    }),
  }

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: 0,
        fontSize,
        fontFamily,
        fontWeight,
        letterSpacing,
        ...getStyleVariation(),
      }}
    >
      {characters.map((character, index) => (
        <motion.span
          key={character.id}
          custom={index}
          variants={characterVariants}
          initial="initial"
          animate={isPlaying ? "flicker" : "initial"}
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            lineHeight: 1,
          }}
        >
          {character.char}
        </motion.span>
      ))}
    </div>
  )
}