// src/components/ui/BorderBeam.tsx
"use client";

import { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  reverse?: boolean;
  borderWidth?: number;
}

export function BorderBeam({
  className,
  duration = 8,
  delay = 0,
  colorFrom = "#ffffff",
  colorTo = "transparent",
  reverse = false,
  borderWidth = 1,
}: BorderBeamProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden", className)}
      style={
        {
          "--duration": `${duration}s`,
          "--delay": `${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
          "--direction": reverse ? "reverse" : "normal",
        } as CSSProperties
      }
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          padding: `${borderWidth}px`,
          background: `conic-gradient(from calc(var(--angle, 0deg)), transparent 0%, transparent 40%, var(--color-from) 60%, var(--color-to) 80%, transparent 100%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          animation: `border-beam-spin var(--duration) linear var(--delay) infinite var(--direction)`,
        }}
      />
      <style>{`
        @keyframes border-beam-spin {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
      `}</style>
    </div>
  );
}