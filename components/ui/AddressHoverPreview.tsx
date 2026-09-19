"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import {
  useEffect,
  useState,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

type AddressHoverPreviewProps = {
  address: string;
  href: string;
  imageSrc: string;
  displayText?: string;
  label?: string;
  variant?: "inline" | "card";
  className?: string;
  iconSize?: number;
  iconClassName?: string;
};

export default function AddressHoverPreview({
  address,
  href,
  imageSrc,
  displayText,
  label,
  variant = "inline",
  className,
  iconSize = 16,
  iconClassName = "mt-0.5 flex-shrink-0",
}: AddressHoverPreviewProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleMouseMove(event: MouseEvent<HTMLAnchorElement>) {
    const previewSize = 220;
    const offset = 20;

    let x = event.clientX + offset;
    let y = event.clientY + offset;

    if (x + previewSize > window.innerWidth - 12) {
      x = event.clientX - previewSize - offset;
    }

    if (y + previewSize > window.innerHeight - 12) {
      y = event.clientY - previewSize - offset;
    }

    setPosition({ x, y });
  }

  const preview = (
    <div
      className={`pointer-events-none fixed z-[9999] h-[220px] w-[220px] overflow-hidden rounded-lg border border-white/30 bg-neutral-900 shadow-2xl transition-[opacity,transform] duration-200 ease-out ${
        isVisible
          ? "scale-100 opacity-100"
          : "scale-90 opacity-0"
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <Image
        src={imageSrc}
        alt=""
        fill
        className="object-cover"
        sizes="220px"
      />

      <div className="absolute inset-0 ring-1 ring-inset ring-black/10" />
    </div>
  );

  const previewPortal =
    mounted && window.innerWidth >= 768
      ? createPortal(preview, document.body)
      : null;

  if (variant === "card") {
    return (
      <>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => {
            if (window.innerWidth >= 768) {
              setIsVisible(true);
            }
          }}
          onMouseLeave={() => setIsVisible(false)}
          onMouseMove={handleMouseMove}
          className={className ?? "transition-opacity hover:opacity-70"}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-burgundy/30 text-burgundy">
              <MapPin size={22} />
            </div>

            <div>
              {label && (
                <p className="text-sm font-medium uppercase tracking-wide text-neutral-400">
                  {label}
                </p>
              )}

              <p className="mt-1 whitespace-pre-line text-neutral-800">
                {displayText ?? address}
              </p>
            </div>
          </div>
        </a>

        {previewPortal}
      </>
    );
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => {
          if (window.innerWidth >= 768) {
            setIsVisible(true);
          }
        }}
        onMouseLeave={() => setIsVisible(false)}
        onMouseMove={handleMouseMove}
        className={
          className ??
          "flex items-start gap-2 text-sm text-neutral-700 transition-colors hover:text-burgundy"
        }
      >
        <MapPin
          size={iconSize}
          className={iconClassName}
        />

        <span className="whitespace-pre-line">
          {displayText ?? address}
        </span>
      </a>

      {previewPortal}
    </>
  );
}