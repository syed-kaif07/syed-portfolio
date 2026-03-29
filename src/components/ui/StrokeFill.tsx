"use client";
import React from "react";
import { motion } from "framer-motion";

export const StrokeFill = () => {
    return (
        <svg viewBox="0 0 900 160" className="w-full max-w-4xl h-auto">
            <motion.text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="1.5"
                fontWeight="900"
                fontSize="90"
                fontFamily="Space Grotesk, sans-serif"
                letterSpacing="4"
                className="uppercase stroke-white fill-transparent"
                initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
                animate={{
                    strokeDashoffset: 0,
                    fill: "#ffffff",
                }}
                transition={{
                    duration: 3,
                    ease: "easeInOut",
                    fill: { delay: 2, duration: 1, ease: "easeIn" },
                }}
            >
                Syed Kaifuddin
            </motion.text>
        </svg>
    );
};