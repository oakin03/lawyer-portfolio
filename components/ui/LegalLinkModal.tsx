"use client";

import { useState } from "react";

type LegalLinkModalProps = {
  label: string;
  title: string;
  content: string;
  closeLabel: string;
};

export default function LegalLinkModal({ label, title, content, closeLabel }: LegalLinkModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-sm text-neutral-500 transition-colors hover:text-burgundy hover:underline"
      >
        {label}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-xl">
            <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
            <p className="mt-4 whitespace-pre-line leading-relaxed text-neutral-600">{content}</p>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-burgundy px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-burgundy-dark"
              >
                {closeLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}