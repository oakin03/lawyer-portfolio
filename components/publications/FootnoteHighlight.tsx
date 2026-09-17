"use client";

import { useEffect } from "react";

export default function FootnoteHighlight() {
  useEffect(() => {
    let highlightTimer: ReturnType<typeof setTimeout> | null = null;

    function highlight(element: HTMLElement) {
      document
        .querySelectorAll(".footnote-highlight")
        .forEach((item) => {
          item.classList.remove("footnote-highlight");
        });

      // Animasyonun aynı elemana ikinci kez tıklandığında da
      // yeniden başlamasını garanti eder.
      void element.offsetWidth;

      element.classList.add("footnote-highlight");

      if (highlightTimer) {
        clearTimeout(highlightTimer);
      }

      highlightTimer = setTimeout(() => {
        element.classList.remove("footnote-highlight");
      }, 1600);
    }

    function waitForScrollToFinish() {
      return new Promise<void>((resolve) => {
        let scrollTimer: ReturnType<typeof setTimeout> | null = null;
        let finished = false;

        function finish() {
          if (finished) return;

          finished = true;

          if (scrollTimer) {
            clearTimeout(scrollTimer);
          }

          window.removeEventListener("scroll", onScroll);

          resolve();
        }

        function onScroll() {
          if (scrollTimer) {
            clearTimeout(scrollTimer);
          }

          // 120 ms boyunca scroll olmuyorsa hareket tamamlandı.
          scrollTimer = setTimeout(finish, 120);
        }

        window.addEventListener("scroll", onScroll, {
          passive: true,
        });

        // Hedef zaten görünür durumdaysa scroll olayı oluşmayabilir.
        scrollTimer = setTimeout(finish, 250);

        // Güvenlik için maksimum bekleme.
        setTimeout(finish, 2000);
      });
    }

    async function handleClick(event: MouseEvent) {
      const clicked = event.target as HTMLElement | null;

      if (!clicked) return;

      const link = clicked.closest<HTMLAnchorElement>(
        "a.footnote-ref, a.footnote-backref"
      );

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href?.startsWith("#")) return;

      const id = decodeURIComponent(href.slice(1));
      const target = document.getElementById(id);

      if (!target) return;

      // Tarayıcının kendi hash atlamasını engelliyoruz.
      event.preventDefault();

      // URL'deki #fn-... bilgisi yine kalsın.
      window.history.pushState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#${id}`
      );

      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // Önce kayma bitsin.
      await waitForScrollToFinish();

      // Sonra hedef parlasın.
      highlight(target);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);

      if (highlightTimer) {
        clearTimeout(highlightTimer);
      }
    };
  }, []);

  return null;
}