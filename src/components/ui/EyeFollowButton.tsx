import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface EyeFollowButtonProps {
  text?: string
  onClick?: () => void
  href?: string
  buttonColor?: string
  textColor?: string
  fontSize?: number
  fontWeight?: number
  paddingX?: number
  paddingY?: number
  radius?: number
  eyeCount?: 1 | 2
  eyeColor?: string
  pupilColor?: string
  eyeSize?: number
  pupilSize?: number
  eyeGap?: number
  speed?: number
  range?: number
  blinking?: boolean
  blinkingIntensity?: number
}

function Eye({
  eyeColor,
  pupilColor,
  eyeSize,
  pupilSize,
  range,
  speed,
  blinking,
  blinkInterval,
}: {
  eyeColor: string
  pupilColor: string
  eyeSize: number
  pupilSize: number
  range: number
  speed: number
  blinking: boolean
  blinkInterval: number
}) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const pupilRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(0)
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 })
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const eye = eyeRef.current
      if (!eye) return
      const rect = eye.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)
      const clamped = Math.min(dist, range)
      const angle = Math.atan2(dy, dx)
      targetRef.current = {
        x: Math.cos(angle) * clamped,
        y: Math.sin(angle) * clamped,
      }
    }

    window.addEventListener("mousemove", onMouseMove)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      pupilRef.current.x = lerp(pupilRef.current.x, targetRef.current.x, speed)
      pupilRef.current.y = lerp(pupilRef.current.y, targetRef.current.y, speed)
      setPupilPos({ x: pupilRef.current.x, y: pupilRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [range, speed])

  useEffect(() => {
    if (!blinking) return
    let blinkTimer: ReturnType<typeof setTimeout>
    const scheduleNext = () => {
      const delay = blinkInterval + Math.random() * blinkInterval
      blinkTimer = setTimeout(() => {
        setIsBlinking(true)
        setTimeout(() => {
          setIsBlinking(false)
          scheduleNext()
        }, 150)
      }, delay)
    }
    scheduleNext()
    return () => clearTimeout(blinkTimer)
  }, [blinking, blinkInterval])

  return (
    <div
      ref={eyeRef}
      style={{
        width: eyeSize,
        height: eyeSize,
        borderRadius: "50%",
        backgroundColor: eyeColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        // ✅ fixed: scaleY as CSS transform string, not a prop
        transform: isBlinking ? "scaleY(0.1)" : "scaleY(1)",
        transition: "transform 0.08s ease",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: pupilSize,
          height: pupilSize,
          borderRadius: "50%",
          backgroundColor: pupilColor,
          transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
          willChange: "transform",
        }}
      />
    </div>
  )
}

export function EyeFollowButton({
  text = "Explore My Work",
  onClick,
  href,
  buttonColor = "#ffffff",
  textColor = "#000000",
  fontSize = 14,
  fontWeight = 600,
  paddingX = 24,
  paddingY = 13,
  radius = 100,
  eyeCount = 2,
  eyeColor = "#000000",
  pupilColor = "#ffffff",
  eyeSize = 28,
  pupilSize = 12,
  eyeGap = 5,
  speed = 0.16,
  range = 6,
  blinking = true,
  blinkingIntensity = 2500,
}: EyeFollowButtonProps) {
  const inner = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: eyeGap + 8, flexDirection: "row-reverse" as const,
        backgroundColor: buttonColor,
        borderRadius: radius,
        padding: `${paddingY}px ${paddingX}px`,
        userSelect: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: eyeGap }}>
        <Eye
          eyeColor={eyeColor}
          pupilColor={pupilColor}
          eyeSize={eyeSize}
          pupilSize={pupilSize}
          range={range}
          speed={speed}
          blinking={blinking}
          blinkInterval={blinkingIntensity}
        />
        {eyeCount === 2 && (
          <Eye
            eyeColor={eyeColor}
            pupilColor={pupilColor}
            eyeSize={eyeSize}
            pupilSize={pupilSize}
            range={range}
            speed={speed}
            blinking={blinking}
            blinkInterval={blinkingIntensity}
          />
        )}
      </div>

      <span
        style={{
          color: textColor,
          fontSize,
          fontWeight,
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}
      >
        {text}
      </span>
    </motion.div>
  )

  if (href) return <a href={href} style={{ textDecoration: "none" }}>{inner}</a>
  return inner
}