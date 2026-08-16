"use client";

import { useEffect, useRef, useState } from "react";

export default function StaggerGroup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    // Same safety net as ScrollReveal — guarantees cards never stay stuck
    // invisible if the observer misbehaves on a particular browser/device.
    const fallback = window.setTimeout(() => setIsVisible(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`group ${isVisible ? "is-visible" : ""} ${className}`}>
      {children}
    </div>
  );
}