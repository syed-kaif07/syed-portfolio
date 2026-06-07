import { useRef, useEffect, useState, memo } from "react";

export interface VideoSource {
  src: string;
  type: string;
}

export interface OptimizedVideoProps {
  poster: string;
  src?: string;
  sources?: VideoSource[];
  className?: string;
  style?: React.CSSProperties;
  preload?: "none" | "metadata" | "auto";
  loadDelay?: number;
  rootMargin?: string;
  threshold?: number;
  ariaLabel?: string;
  isHero?: boolean;
}

const OptimizedVideoComponent = ({
  poster,
  src,
  sources,
  className = "",
  style,
  preload = "none",
  loadDelay = 400,
  rootMargin = "200px",
  threshold = 0.1,
  ariaLabel,
  isHero = false,
}: OptimizedVideoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasLoadedRef = useRef(isHero); // tracks if we ever loaded; never goes back to false

  const [shouldLoad, setShouldLoad] = useState(isHero);
  const [isVisible, setIsVisible] = useState(isHero);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    if (isHero) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Only trigger a load the very first time
          if (!hasLoadedRef.current) {
            timerRef.current = setTimeout(() => {
              hasLoadedRef.current = true;
              setShouldLoad(true);
            }, loadDelay);
          }
        } else {
          setIsVisible(false);
          // Clear the timer if user scrolls away before delay fires
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          // No longer resetting shouldLoad to false here.
          // Once loaded, the video stays loaded in memory.
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isHero, loadDelay, rootMargin, threshold]);

  // Runs exactly once when shouldLoad flips to true
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;
    video.load();
  }, [shouldLoad]);

  // Play/pause based on visibility, but only after loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (isVisible) {
      const promise = video.play();
      if (promise !== undefined) promise.catch(() => {});
    } else {
      video.pause(); // pause when scrolled out, but keep it loaded
    }
  }, [isVisible, shouldLoad]);

  return (
    <div ref={containerRef} className="relative w-full h-full">
      {/* Skeleton Loading Placeholder */}
      {!isVideoLoaded && (
        <div 
          className="absolute inset-0 bg-[#0d0d12]/90 backdrop-blur-sm animate-pulse rounded-[inherit] z-20 flex items-center justify-center border border-white/5"
          style={style}
        >
          <div className="w-8 h-8 border-2 border-white/10 border-t-white/60 rounded-full animate-spin" />
        </div>
      )}
      <video
        ref={videoRef}
        poster={poster}
        preload={preload}
        muted
        loop
        playsInline
        className={className}
        style={style}
        aria-label={ariaLabel}
        onLoadedData={() => setIsVideoLoaded(true)}
        onCanPlay={() => setIsVideoLoaded(true)}
        onPlay={() => setIsVideoLoaded(true)}
      >
        {shouldLoad && sources && sources.length > 0
          ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)
          : shouldLoad && src
          ? <source src={src} type="video/mp4" />
          : null}
      </video>
    </div>
  );
};

export const OptimizedVideo = memo(OptimizedVideoComponent);