"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Sayfa başına dön"
      className={`fixed bottom-6 left-1/2 z-40 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full bg-burgundy text-white shadow-lg transition-all duration-300 hover:bg-burgundy-dark ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
}