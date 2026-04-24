import {useEffect, useRef, useState} from 'react';

type DeferredVideoProps = {
  poster: string;
  posterAlt: string;
  src: string;
};

export default function DeferredVideo({poster, posterAlt, src}: DeferredVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (shouldLoadVideo || !containerRef.current) return;

    if (!('IntersectionObserver' in window)) {
      setShouldLoadVideo(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {rootMargin: '320px 0px'},
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [shouldLoadVideo]);

  return (
    <div ref={containerRef} className="relative aspect-video w-full overflow-hidden rounded-xl bg-black shadow-2xl">
      {shouldLoadVideo ? (
        <video
          className="h-full w-full object-cover"
          controls
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={poster}
          alt={posterAlt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
