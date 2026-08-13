"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterDropdown({
  label,
  activeLabel,
  activeValue,
  options,
  onSelect,
}: {
  label: string;
  activeLabel: string;
  activeValue: string | null;
  options: { value: string | null; label: string }[];
  onSelect: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-700 transition-colors hover:border-burgundy"
      >
        <span className="text-neutral-400">{label}:</span>
        {activeLabel}
        <ChevronDown size={14} />
      </button>
      {open && (
        <div className="absolute start-0 top-full z-20 mt-1 max-h-64 w-56 overflow-y-auto rounded-md border border-neutral-200 bg-white p-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value ?? "all"}
              type="button"
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className={`block w-full rounded px-3 py-2 text-start text-sm transition-colors ${
                activeValue === opt.value ? "bg-burgundy text-white" : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}