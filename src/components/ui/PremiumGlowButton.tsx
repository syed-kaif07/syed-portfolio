import { useRef } from "react"
import { motion } from "framer-motion"

// ─── CleanButton ("Explore My Work" — white solid, like "Get started") ────────

interface CleanButtonProps {
  text: string
  onClick?: () => void
  href?: string
  fontSize?: number
  fontWeight?: number
  radius?: number
  paddingX?: number
  paddingY?: number
}

export function PremiumGlowButton({
  text = "Explore My Work",
  onClick,
  href,
  fontSize = 14,
  fontWeight = 600,
  radius = 100,
  paddingX = 32,
  paddingY = 14,
}: CleanButtonProps) {
  const inner = (
    <motion.div
      whileHover={{ scale: 1.02, backgroundColor: "#e5e5e5" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        cursor: "pointer",
        width: "max-content",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderRadius: radius,
        padding: `${paddingY}px ${paddingX}px`,
        backgroundColor: "#ffffff",
      }}
    >
      <span
        style={{
          color: "#000000",
          fontSize,
          fontWeight,
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}
      >
        {text}
      </span>
      {/* Arrow icon */}
      <svg
        width="15"
        height="15"
        viewBox="0 0 16 16"
        fill="none"
        style={{ color: "#000000" }}
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )

  if (href) return <a href={href} style={{ textDecoration: "none" }}>{inner}</a>
  return inner
}

// ─── MinimalButton ("Contact Me" — ghost white border) ───────────────────────

interface MinimalButtonProps {
  text: string
  onClick?: () => void
  href?: string
  fontSize?: number
  fontWeight?: number
  radius?: number
  paddingX?: number
  paddingY?: number
}

export function MinimalButton({
  text = "Contact Me",
  onClick,
  href,
  fontSize = 14,
  fontWeight = 500,
  radius = 100,
  paddingX = 32,
  paddingY = 14,
}: MinimalButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const inner = (
    <motion.div
      ref={ref}
      whileHover={{
        scale: 1.02,
        backgroundColor: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.5)",
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{
        cursor: "pointer",
        width: "max-content",
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: radius,
        padding: `${paddingY}px ${paddingX}px`,
        backgroundColor: "transparent",
      }}
    >
      <span
        style={{
          color: "#ffffff",
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