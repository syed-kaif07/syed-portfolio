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

  const [isIntersecting, setIsIntersecting] = useState(isHero);
  const [shouldLoad, setShouldLoad] = useState(isHero);

  useEffect(() => {
    if (isHero) return;

    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          timerRef.current = setTimeout(() => {
            setShouldLoad(true);
          }, loadDelay);
        } else {
          setIsIntersecting(false);
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          setShouldLoad(false);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldLoad) {
      video.load();
      if (isIntersecting) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      }
    } else {
      video.pause();
      video.load();
    }
  }, [shouldLoad, isIntersecting]);

  return (
    <div ref={containerRef} className="w-full h-full">
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
      >
        {shouldLoad && sources && sources.length > 0
          ? sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)
          : shouldLoad && src && <source src={src} type="video/mp4" />}
      </video>
    </div>
  );
};

export const OptimizedVideo = memo(OptimizedVideoComponent);
