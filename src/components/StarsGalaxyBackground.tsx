import { useEffect, useRef } from "react"

interface StarsGalaxyBackgroundProps {
  stars?: number
  speed?: number
  spread?: number
  focal?: number
  twinkle?: number
  trail?: number
  size?: number
  fadeInRange?: number
  reverseFly?: boolean
  background?: string
  starColor?: string
  className?: string
}

export default function StarsGalaxyBackground({
  stars = 5000,
  speed = 1.2,
  spread = 2.8,
  focal = 1,
  twinkle = 0.45,
  trail = 0.85,
  size = 3,
  fadeInRange = 4,
  reverseFly = true,
  background = "#000000",
  starColor = "#ffffff",
  className,
}: StarsGalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")!
    const DPR = window.devicePixelRatio || 1

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v))

    const createStar = () => ({
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      z: Math.random(),
      tw: Math.random() * Math.PI * 2,
    })

    type Star = ReturnType<typeof createStar>

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width * DPR
      canvas.height = rect.height * DPR
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    resize()
    window.addEventListener("resize", resize)

    const starsArr: Star[] = Array.from({ length: stars }, createStar)

    let raf = 0

    const animate = () => {
      const w = canvas.width / DPR
      const h = canvas.height / DPR

      ctx.globalAlpha = 1
      ctx.fillStyle = background
      ctx.fillRect(0, 0, w, h)

      if (trail < 1) {
        ctx.globalAlpha = 1 - trail
        ctx.fillStyle = background
        ctx.fillRect(0, 0, w, h)
      }

      ctx.globalAlpha = 1
      ctx.fillStyle = starColor

      const cx = w / 2
      const cy = h / 2

      for (const s of starsArr) {
        const depth = s.z * clamp(focal, 0.01, 10) + 0.001
        const px = cx + (s.x / depth) * w
        const py = cy + (s.y / depth) * h

        s.z += reverseFly
          ? clamp(speed, 0, 10) * 0.002
          : -clamp(speed, 0, 10) * 0.002

        if (s.z <= 0 || s.z > 1) Object.assign(s, createStar())

        s.tw += clamp(twinkle, 0, 1) * 0.05

        // Higher base opacity — minimum 0.6, max 1.0
        const rawAlpha = Math.max(0, 1 - s.z / clamp(fadeInRange, 0.1, 10))
        const alpha = 0.6 + rawAlpha * 0.4

        const radius =
          clamp(size, 0.1, 5) *
          (1 - s.z) *
          (1 + Math.sin(s.tw) * clamp(twinkle, 0, 1))

        ctx.globalAlpha = alpha
        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      raf = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [stars, speed, spread, focal, twinkle, trail, size, fadeInRange, reverseFly, background, starColor])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
        background,
      }}
    />
  )
}