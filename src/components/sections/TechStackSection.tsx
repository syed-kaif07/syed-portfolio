import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

const techItems = [
  "Python", "TypeScript", "React", "Next.js", "Node.js",
  "FastAPI", "PostgreSQL", "Docker", "CrewAI", "Tailwind CSS",
];

function wrap(min: number, max: number, v: number): number {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

interface MarqueeRowProps {
  items: string[];
  baseVelocity: number;
}

function MarqueeRow({ items, baseVelocity = 1 }: MarqueeRowProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => v + "%");
  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(wrap(-20, -45, baseX.get() + moveBy));
  });

  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="overflow-hidden flex whitespace-nowrap">
      <motion.div className="flex gap-6" style={{ x }}>
        {repeated.map((tech, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-8 py-3 text-base text-white/50 transition-all duration-300 hover:border-white/40 hover:text-white cursor-default"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

const TechStackSection = () => {
  return (
    <section id="techstack" className="py-xxl">
      <h2 className="font-heading font-black uppercase tracking-tighter text-foreground text-left text-[4rem] leading-none md:text-[6rem] lg:text-[8rem] mb-4 px-4 md:px-8">
        Tech Stack
      </h2>

      <div className="mt-xl flex flex-col gap-6">
        <MarqueeRow items={techItems} baseVelocity={0.8} />
        <MarqueeRow items={[...techItems].reverse()} baseVelocity={-0.8} />
      </div>
    </section>
  );
};

export default TechStackSection;