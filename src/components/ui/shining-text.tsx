"use client" 

import * as React from "react"
import { motion } from "framer-motion";
 
export function ShiningText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={`bg-[linear-gradient(110deg,#542070,35%,#fff,50%,#542070,75%,#542070)] bg-[length:200%_100%] bg-clip-text text-transparent ${className || ""}`}
      initial={{ backgroundPosition: "200% 0" }}
      animate={{ backgroundPosition: "-200% 0" }}
      transition={{
        repeat: Infinity,
        duration: 8,
        ease: "easeInOut",
      }}
    >
      {text}
    </motion.span>
  );
}
