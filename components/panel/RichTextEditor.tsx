"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  EditorContent,
  Extension,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Image } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
  ImageIcon,
  TableIcon,
  Columns,
  Rows,
  Trash2,
  Undo,
  Redo,
  Palette,
  FileUp,
  FileText,
  Upload,
  X,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type WordBlock = {
  html: string;
  text: string;
  tag: string;
};

type FootnoteMap = Record<string, string>;

type EditorDefaults = {
  bodyFont: string;
  bodySize: number;
  bodyColor: string;

  headingFont: string;
  headingColor: string;

  headingSize: number;
  subheadingSize: number;
};

/* -------------------------------------------------------------------------- */
/* DEFAULTS                                                                   */
/* -------------------------------------------------------------------------- */

const DEFAULT_SETTINGS: EditorDefaults = {
  bodyFont: "",
  bodySize: 18,
  bodyColor: "#000000",

  headingFont: "",
  headingColor: "#000000",

  headingSize: 22,
  subheadingSize: 20,
};

const FRONT_MATTER_HEADINGS = new Set([
  "İÇİNDEKİLER",
  "İÇİNDEKİLER TABLOSU",
  "KISALTMALAR",
  "ÖZET",
  "ABSTRACT",
  "TABLE OF CONTENTS",
  "ABBREVIATIONS",
]);

const BIBLIOGRAPHY_HEADINGS = new Set([
  "KAYNAKÇA",
  "KAYNAKLAR",
  "BIBLIOGRAPHY",
  "REFERENCES",
]);

const FONT_OPTIONS = [
  {
    label: "Varsayılan",
    value: "",
  },
  {
    label: "Arial",
    value: "Arial, sans-serif",
  },
  {
    label: "Helvetica",
    value: "Helvetica, sans-serif",
  },
  {
    label: "Times New Roman",
    value: "'Times New Roman', serif",
  },
  {
    label: "Georgia",
    value: "Georgia, serif",
  },
  {
    label: "Verdana",
    value: "Verdana, sans-serif",
  },
  {
    label: "Trebuchet MS",
    value: "'Trebuchet MS', sans-serif",
  },
  {
    label: "Garamond",
    value: "Garamond, serif",
  },
  {
    label: "Courier New",
    value: "'Courier New', monospace",
  },
  {
    label: "Comic Sans MS",
    value: "'Comic Sans MS', cursive",
  },
  {
    label: "Impact",
    value: "Impact, sans-serif",
  },
  {
    label: "Palatino Linotype",
    value: "'Palatino Linotype', serif",
  },
  {
    label: "Book Antiqua",
    value: "'Book Antiqua', serif",
  },
  {
    label: "Century Gothic",
    value: "'Century Gothic', sans-serif",
  },
  {
    label: "Lucida Sans Unicode",
    value: "'Lucida Sans Unicode', sans-serif",
  },
  {
    label: "Tahoma",
    value: "Tahoma, sans-serif",
  },
  {
    label: "Calibri",
    value: "Calibri, sans-serif",
  },
  {
    label: "Cambria",
    value: "Cambria, serif",
  },
  {
    label: "Playfair Display",
    value: "'Playfair Display', serif",
  },
];

const SIZE_OPTIONS = [
  12,
  14,
  16,
  18,
  20,
  22,
  24,
  28,
  32,
  36,
  40,
  44,
  48,
];

const COLOR_SWATCHES = [
  "#FFFFFF",
  "#000000",
  "#7a1f2b",
  "#D4AF37",
  "#404040",
  "#808080",
  "#BFBFBF",
  "#C00000",
  "#FF0000",
  "#FFA500",
  "#FFD700",
  "#92D050",
  "#00B050",
  "#00B0F0",
  "#0070C0",
  "#002060",
  "#7030A0",
  "#FF66CC",
  "#843C0C",
  "#BF9000",
];

/* -------------------------------------------------------------------------- */
/* TIPTAP EXTENSIONS                                                         */
/* -------------------------------------------------------------------------- */

const FontSize = Extension.create({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,

        attributes: {
          fontSize: {
            default: null,

            parseHTML: (element: HTMLElement) =>
              element.style.fontSize || null,

            renderHTML: (
              attributes: {
                fontSize?: string | null;
              }
            ) => {
              if (!attributes.fontSize) {
                return {};
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: { chain: () => any }) =>
          chain()
            .setMark("textStyle", {
              fontSize,
            })
            .run(),

      unsetFontSize:
        () =>
        ({ chain }: { chain: () => any }) =>
          chain()
            .setMark("textStyle", {
              fontSize: null,
            })
            .run(),
    };
  },
});

const LinkWithExtraAttributes = Link.extend({
  addAttributes() {
    return {
      ...(this.parent?.() ?? {}),

      id: {
        default: null,

        parseHTML: (element) =>
          element.getAttribute("id"),

        renderHTML: (attributes) =>
          attributes.id
            ? {
                id: attributes.id,
              }
            : {},
      },

      class: {
        default: null,

        parseHTML: (element) =>
          element.getAttribute("class"),

        renderHTML: (attributes) =>
          attributes.class
            ? {
                class: attributes.class,
              }
            : {},
      },

      dataFootnoteKey: {
        default: null,

        parseHTML: (element) =>
          element.getAttribute(
            "data-footnote-key"
          ),

        renderHTML: (attributes) =>
          attributes.dataFootnoteKey
            ? {
                "data-footnote-key":
                  attributes.dataFootnoteKey,
              }
            : {},
      },
    };
  },
});

const BlockStyleAttributes = Extension.create({
  name: "blockStyleAttributes",

  addGlobalAttributes() {
    return [
      {
        types: [
          "paragraph",
          "heading",
          "listItem",
          "tableCell",
          "tableHeader",
        ],

        attributes: {
          style: {
            default: null,

            parseHTML: (element) =>
              element.getAttribute("style"),

            renderHTML: (attributes) =>
              attributes.style
                ? {
                    style: attributes.style,
                  }
                : {},
          },

          id: {
            default: null,

            parseHTML: (element) =>
              element.getAttribute("id"),

            renderHTML: (attributes) =>
              attributes.id
                ? {
                    id: attributes.id,
                  }
                : {},
          },

          dataFootnoteKey: {
            default: null,

            parseHTML: (element) =>
              element.getAttribute(
                "data-footnote-key"
              ),

            renderHTML: (attributes) =>
              attributes.dataFootnoteKey
                ? {
                    "data-footnote-key":
                      attributes.dataFootnoteKey,
                  }
                : {},
          },
        },
      },
    ];
  },
});

/* -------------------------------------------------------------------------- */
/* SETTINGS                                                                  */
/* -------------------------------------------------------------------------- */

function loadDefaults(): EditorDefaults {
  if (
    typeof window ===
    "undefined"
  ) {
    return DEFAULT_SETTINGS;
  }

  return {
    bodyFont:
      localStorage.getItem(
        "panelBodyFont"
      ) ??
      localStorage.getItem(
        "panelLastFontFamily"
      ) ??
      DEFAULT_SETTINGS.bodyFont,

    bodySize:
      Number(
        localStorage.getItem(
          "panelBodySize"
        )
      ) ||
      DEFAULT_SETTINGS.bodySize,

    bodyColor:
      localStorage.getItem(
        "panelBodyColor"
      ) ??
      DEFAULT_SETTINGS.bodyColor,

    headingFont:
      localStorage.getItem(
        "panelHeadingFont"
      ) ??
      localStorage.getItem(
        "panelLastFontFamily"
      ) ??
      DEFAULT_SETTINGS.headingFont,

    headingColor:
      localStorage.getItem(
        "panelHeadingColor"
      ) ??
      DEFAULT_SETTINGS.headingColor,

    headingSize:
      Number(
        localStorage.getItem(
          "panelHeadingSize"
        )
      ) ||
      DEFAULT_SETTINGS.headingSize,

    subheadingSize:
      Number(
        localStorage.getItem(
          "panelSubheadingSize"
        )
      ) ||
      DEFAULT_SETTINGS.subheadingSize,
  };
}

function fontCss(
  font: string
) {
  return font || "inherit";
}

function bodyStyle(
  settings: EditorDefaults
) {
  return [
    `font-family:${fontCss(
      settings.bodyFont
    )}`,
    `font-size:${settings.bodySize}px`,
    `color:${settings.bodyColor}`,
  ].join(";");
}

function headingStyle(
  settings: EditorDefaults,
  level: 2 | 3
) {
  const size =
    level === 2
      ? settings.headingSize
      : settings.subheadingSize;

  return [
    `font-family:${fontCss(
      settings.headingFont
    )}`,
    `font-size:${size}px`,
    `color:${settings.headingColor}`,
    "font-weight:700",
  ].join(";");
}

/* -------------------------------------------------------------------------- */
/* WORD HELPERS                                                              */
/* -------------------------------------------------------------------------- */

function normalizeHeading(
  text: string
) {
  return text
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(
      /[.:;]+$/,
      ""
    )
    .toLocaleUpperCase(
      "tr-TR"
    );
}

function stripOldNumber(
  text: string
) {
  return text
    .replace(
      /^\s*(?:[A-ZÇĞİÖŞÜ]\.\s+|\d+(?:\.\d+)*[.)]?\s+)/u,
      ""
    )
    .trim();
}

function changeTag(
  element: Element,
  tag: "h2" | "h3"
) {
  const replacement =
    element.ownerDocument.createElement(
      tag
    );

  replacement.innerHTML =
    element.innerHTML;

  element.replaceWith(
    replacement
  );

  return replacement;
}

function cleanHeadingText(
  element: Element
) {
  const walker =
    element.ownerDocument.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
    );

  const first =
    walker.nextNode() as Text | null;

  if (!first) {
    return;
  }

  first.textContent =
    stripOldNumber(
      first.textContent ?? ""
    );
}

function looksLikeUppercaseHeading(
  text: string
) {
  const value =
    text
      .replace(/\s+/g, " ")
      .trim();

  if (
    value.length < 4 ||
    value.length > 140 ||
    /[.!?;:]$/.test(value)
  ) {
    return false;
  }

  const letters =
    value.replace(
      /[^A-Za-zÇĞİÖŞÜçğıöşü]/g,
      ""
    );

  if (!letters) {
    return false;
  }

  return (
    letters ===
    letters.toLocaleUpperCase(
      "tr-TR"
    )
  );
}

function normalizeImportedHeadings(
  root: HTMLElement
) {
  Array.from(
    root.querySelectorAll(
      "h1,h2,h3,h4,h5,h6"
    )
  ).forEach(
    (heading) => {
      const level =
        Number(
          heading.tagName.substring(
            1
          )
        );

      const replacement =
        changeTag(
          heading,
          level <= 2
            ? "h2"
            : "h3"
        );

      cleanHeadingText(
        replacement
      );
    }
  );

  Array.from(
    root.children
  )
    .filter(
      (element) =>
        element.tagName === "P"
    )
    .forEach(
      (element) => {
        const text =
          element.textContent
            ?.replace(
              /\s+/g,
              " "
            )
            .trim() ?? "";

        if (!text) {
          return;
        }

        if (
          /^[A-ZÇĞİÖŞÜ]\.\s+/u.test(
            text
          )
        ) {
          const heading =
            changeTag(
              element,
              "h2"
            );

          cleanHeadingText(
            heading
          );

          return;
        }

        if (
          /^\d+(?:\.\d+)*[.)]?\s+/u.test(
            text
          )
        ) {
          const heading =
            changeTag(
              element,
              "h3"
            );

          cleanHeadingText(
            heading
          );

          return;
        }

        if (
          looksLikeUppercaseHeading(
            text
          ) &&
          !FRONT_MATTER_HEADINGS.has(
            normalizeHeading(
              text
            )
          ) &&
          !BIBLIOGRAPHY_HEADINGS.has(
            normalizeHeading(
              text
            )
          )
        ) {
          changeTag(
            element,
            "h2"
          );
        }
      }
    );
}

function sanitizeImportedContent(
  root: HTMLElement
) {
  root
    .querySelectorAll(
      "script,style,iframe,object,embed,form,input,button"
    )
    .forEach(
      (element) =>
        element.remove()
    );

  root
    .querySelectorAll<HTMLElement>(
      "*"
    )
    .forEach(
      (element) => {
        Array.from(
          element.attributes
        ).forEach(
          (attribute) => {
            if (
              attribute.name
                .toLowerCase()
                .startsWith(
                  "on"
                )
            ) {
              element.removeAttribute(
                attribute.name
              );
            }
          }
        );

        /*
         * Word'ün kendi font,
         * punto ve renkleri alınmaz.
         */
        element.removeAttribute(
          "style"
        );

        element.removeAttribute(
          "class"
        );
      }
    );

  root
    .querySelectorAll<HTMLAnchorElement>(
      "a"
    )
    .forEach(
      (anchor) => {
        const href =
          anchor
            .getAttribute(
              "href"
            )
            ?.trim() ?? "";

        if (
          /^javascript:/i.test(
            href
          ) ||
          /^data:/i.test(
            href
          )
        ) {
          anchor.removeAttribute(
            "href"
          );
        }
      }
    );

  /*
   * Word görsellerini otomatik
   * olarak DB HTML'ine gömmüyoruz.
   */
  root
    .querySelectorAll(
      "img"
    )
    .forEach(
      (image) =>
        image.remove()
    );
}

function applyDefaultsToImportedContent(
  root: HTMLElement,
  settings: EditorDefaults
) {
  root
    .querySelectorAll<HTMLElement>(
      "h2"
    )
    .forEach(
      (element) => {
        element.setAttribute(
          "style",
          headingStyle(
            settings,
            2
          )
        );
      }
    );

  root
    .querySelectorAll<HTMLElement>(
      "h3"
    )
    .forEach(
      (element) => {
        element.setAttribute(
          "style",
          headingStyle(
            settings,
            3
          )
        );
      }
    );

  root
    .querySelectorAll<HTMLElement>(
      "p,li,td,th"
    )
    .forEach(
      (element) => {
        if (
          element.closest(
            "#footnotes-list"
          )
        ) {
          return;
        }

        element.setAttribute(
          "style",
          bodyStyle(
            settings
          )
        );
      }
    );
}

function detectStartIndex(
  blocks: WordBlock[]
) {
  let lastFrontMatter =
    -1;

  blocks.forEach(
    (
      block,
      index
    ) => {
      if (
        FRONT_MATTER_HEADINGS.has(
          normalizeHeading(
            block.text
          )
        )
      ) {
        lastFrontMatter =
          index;
      }
    }
  );

  const from =
    Math.max(
      lastFrontMatter + 1,
      0
    );

  for (
    let index = from;
    index < blocks.length;
    index += 1
  ) {
    if (
      blocks[index].tag ===
      "H2"
    ) {
      return index;
    }
  }

  return from;
}

function detectBibliographyIndex(
  blocks: WordBlock[]
) {
  return blocks.findIndex(
    (block) =>
      BIBLIOGRAPHY_HEADINGS.has(
        normalizeHeading(
          block.text
        )
      )
  );
}

function parseWordHtml(
  html: string
) {
  const parser =
    new DOMParser();

  const document =
    parser.parseFromString(
      `<div id="word-root">${html}</div>`,
      "text/html"
    );

  const root =
    document.getElementById(
      "word-root"
    );

  if (!root) {
    return {
      blocks:
        [] as WordBlock[],
      footnotes:
        {} as FootnoteMap,
    };
  }

  const footnotes: FootnoteMap =
    {};

  const containers =
    new Set<Element>();

  Array.from(
    root.querySelectorAll<HTMLLIElement>(
      "li[id]"
    )
  )
    .filter(
      (item) =>
        /(?:footnote|endnote)/i.test(
          item.id
        )
    )
    .forEach(
      (item) => {
        footnotes[item.id] =
          item.innerHTML;

        if (
          item.parentElement
        ) {
          containers.add(
            item.parentElement
          );
        }
      }
    );

  containers.forEach(
    (container) =>
      container.remove()
  );

  normalizeImportedHeadings(
    root
  );

  sanitizeImportedContent(
    root
  );

  const blocks: WordBlock[] =
    Array.from(
      root.children
    )
      .filter(
        (element) => {
          const text =
            element.textContent
              ?.trim() ?? "";

          return (
            text.length > 0 ||
            Boolean(
              element.querySelector(
                "table"
              )
            )
          );
        }
      )
      .map(
        (element) => ({
          html:
            element.outerHTML,

          text:
            (
              element.textContent ??
              ""
            )
              .replace(
                /\s+/g,
                " "
              )
              .trim(),

          tag:
            element.tagName,
        })
      );

  return {
    blocks,
    footnotes,
  };
}

/* -------------------------------------------------------------------------- */
/* FOOTNOTES                                                                 */
/* -------------------------------------------------------------------------- */

function syncFootnotesHtml(
  html: string
) {
  const parser =
    new DOMParser();

  const document =
    parser.parseFromString(
      `<div id="root">${html}</div>`,
      "text/html"
    );

  const root =
    document.getElementById(
      "root"
    );

  if (!root) {
    return html;
  }

  const refs =
    Array.from(
      root.querySelectorAll<HTMLAnchorElement>(
        "a.footnote-ref[data-footnote-key]"
      )
    );

  const list =
    root.querySelector<HTMLOListElement>(
      "#footnotes-list"
    );

  if (
    refs.length === 0
  ) {
    root
      .querySelector(
        "#footnotes-divider"
      )
      ?.remove();

    root
      .querySelector(
        "#footnotes-title"
      )
      ?.remove();

    list?.remove();

    return root.innerHTML;
  }

  if (!list) {
    return root.innerHTML;
  }

  const items =
    new Map<
      string,
      HTMLLIElement
    >();

  list
    .querySelectorAll<HTMLLIElement>(
      "li[data-footnote-key]"
    )
    .forEach(
      (item) => {
        const key =
          item.getAttribute(
            "data-footnote-key"
          );

        if (key) {
          items.set(
            key,
            item
          );
        }
      }
    );

  const used =
    new Set<string>();

  refs.forEach(
    (
      ref,
      index
    ) => {
      const number =
        index + 1;

      const key =
        ref.getAttribute(
          "data-footnote-key"
        );

      if (!key) {
        return;
      }

      used.add(key);

      ref.id =
        `fn-ref-${number}`;

      ref.setAttribute(
        "href",
        `#fn-${number}`
      );

      /*
       * Dipnot bağlantıları
       * kesinlikle yeni sekme açmaz.
       */
      ref.removeAttribute(
        "target"
      );

      ref.removeAttribute(
        "rel"
      );

      ref.textContent =
        String(number);

      const item =
        items.get(key);

      if (!item) {
        return;
      }

      item.id =
        `fn-${number}`;

      item
        .querySelectorAll(
          "a.footnote-backref"
        )
        .forEach(
          (oldBack) =>
            oldBack.remove()
        );

      const back =
        document.createElement(
          "a"
        );

      back.setAttribute(
        "href",
        `#fn-ref-${number}`
      );

      back.className =
        "footnote-backref";

      back.removeAttribute(
        "target"
      );

      back.removeAttribute(
        "rel"
      );

      back.textContent =
        "↩";

      const last =
        item.lastElementChild;

      if (
        last?.tagName ===
        "P"
      ) {
        last.append(
          " ",
          back
        );
      } else {
        item.append(
          " ",
          back
        );
      }
    }
  );

  items.forEach(
    (
      item,
      key
    ) => {
      if (
        !used.has(key)
      ) {
        item.remove();
      }
    }
  );

  return root.innerHTML;
}

function appendManualFootnote(
  html: string,
  key: string,
  noteText: string,
  sourceUrl: string,
  settings: EditorDefaults
) {
  const parser =
    new DOMParser();

  const document =
    parser.parseFromString(
      `<div id="root">${html}</div>`,
      "text/html"
    );

  const root =
    document.getElementById(
      "root"
    );

  if (!root) {
    return html;
  }

  let divider =
    root.querySelector(
      "#footnotes-divider"
    );

  let title =
    root.querySelector(
      "#footnotes-title"
    );

  let list =
    root.querySelector<HTMLOListElement>(
      "#footnotes-list"
    );

  if (!divider) {
    divider =
      document.createElement(
        "hr"
      );

    divider.id =
      "footnotes-divider";

    root.appendChild(
      divider
    );
  }

  if (!title) {
    title =
      document.createElement(
        "h4"
      );

    title.id =
      "footnotes-title";

    title.textContent =
      "Dipnotlar";

    root.appendChild(
      title
    );
  }

  if (!list) {
    list =
      document.createElement(
        "ol"
      );

    list.id =
      "footnotes-list";

    root.appendChild(
      list
    );
  }

  const item =
    document.createElement(
      "li"
    );

  item.setAttribute(
    "data-footnote-key",
    key
  );

  item.setAttribute(
    "style",
    bodyStyle(
      settings
    )
  );

  const paragraph =
    document.createElement(
      "p"
    );

  paragraph.textContent =
    noteText;

  if (sourceUrl) {
    try {
      const rawUrl =
        /^https?:\/\//i.test(
          sourceUrl
        )
          ? sourceUrl
          : `https://${sourceUrl}`;

      const parsedUrl =
        new URL(rawUrl);

      if (
        parsedUrl.protocol ===
          "http:" ||
        parsedUrl.protocol ===
          "https:"
      ) {
        const sourceLink =
          document.createElement(
            "a"
          );

        sourceLink.href =
          parsedUrl.toString();

        sourceLink.target =
          "_blank";

        sourceLink.rel =
          "noopener noreferrer";

        sourceLink.textContent =
          "Kaynak";

        paragraph.append(
          " ",
          sourceLink
        );
      }
    } catch {
      // Geçersiz URL ise yalnızca dipnot metni kullanılır.
    }
  }

  item.appendChild(
    paragraph
  );

  list.appendChild(
    item
  );

  return syncFootnotesHtml(
    root.innerHTML
  );
}

/* -------------------------------------------------------------------------- */
/* WORD IMPORT HTML                                                          */
/* -------------------------------------------------------------------------- */

function buildWordImportHtml({
  blocks,
  footnotes,
  startIndex,
  endIndex,
  includeFootnotes,
  includeBibliography,
  settings,
}: {
  blocks: WordBlock[];
  footnotes: FootnoteMap;
  startIndex: number;
  endIndex: number;
  includeFootnotes: boolean;
  includeBibliography: boolean;
  settings: EditorDefaults;
}) {
  if (
    blocks.length === 0
  ) {
    return "";
  }

  let selected =
    blocks.slice(
      startIndex,
      endIndex + 1
    );

  if (
    !includeBibliography
  ) {
    const bibliographyIndex =
      detectBibliographyIndex(
        selected
      );

    if (
      bibliographyIndex !==
      -1
    ) {
      selected =
        selected.slice(
          0,
          bibliographyIndex
        );
    }
  }

  const parser =
    new DOMParser();

  const document =
    parser.parseFromString(
      `<div id="import-root">${selected
        .map(
          (block) =>
            block.html
        )
        .join("")}</div>`,
      "text/html"
    );

  const root =
    document.getElementById(
      "import-root"
    );

  if (!root) {
    return "";
  }

  applyDefaultsToImportedContent(
    root,
    settings
  );

  const references =
    Array.from(
      root.querySelectorAll<HTMLAnchorElement>(
        'a[href^="#"]'
      )
    ).filter(
      (anchor) => {
        const href =
          anchor.getAttribute(
            "href"
          );

        return Boolean(
          href &&
            footnotes[
              href.slice(1)
            ]
        );
      }
    );

  if (
    !includeFootnotes
  ) {
    references.forEach(
      (ref) => {
        const parent =
          ref.parentElement;

        ref.remove();

        if (
          parent?.tagName ===
            "SUP" &&
          !parent.textContent?.trim()
        ) {
          parent.remove();
        }
      }
    );

    return root.innerHTML;
  }

  const numbering =
    new Map<
      string,
      number
    >();

  references.forEach(
    (ref) => {
      const href =
        ref.getAttribute(
          "href"
        );

      if (!href) {
        return;
      }

      const oldId =
        href.slice(1);

      if (
        !numbering.has(
          oldId
        )
      ) {
        numbering.set(
          oldId,
          numbering.size + 1
        );
      }

      const number =
        numbering.get(
          oldId
        )!;

      ref.id =
        `fn-ref-${number}`;

      ref.setAttribute(
        "href",
        `#fn-${number}`
      );

      ref.className =
        "footnote-ref";

      ref.setAttribute(
        "data-footnote-key",
        `word-${number}`
      );

      ref.removeAttribute(
        "target"
      );

      ref.removeAttribute(
        "rel"
      );

      ref.textContent =
        String(number);

      if (
        ref.parentElement
          ?.tagName ===
        "SUP"
      ) {
        ref.parentElement.replaceWith(
          ref
        );
      }
    }
  );

  if (
    numbering.size ===
    0
  ) {
    return root.innerHTML;
  }

  const divider =
    document.createElement(
      "hr"
    );

  divider.id =
    "footnotes-divider";

  const title =
    document.createElement(
      "h4"
    );

  title.id =
    "footnotes-title";

  title.textContent =
    "Dipnotlar";

  const list =
    document.createElement(
      "ol"
    );

  list.id =
    "footnotes-list";

  numbering.forEach(
    (
      number,
      oldId
    ) => {
      const item =
        document.createElement(
          "li"
        );

      item.id =
        `fn-${number}`;

      item.setAttribute(
        "data-footnote-key",
        `word-${number}`
      );

      item.setAttribute(
        "style",
        bodyStyle(
          settings
        )
      );

      const noteDocument =
        parser.parseFromString(
          `<div id="note">${
            footnotes[
              oldId
            ] ?? ""
          }</div>`,
          "text/html"
        );

      const noteRoot =
        noteDocument.getElementById(
          "note"
        );

      if (noteRoot) {
        sanitizeImportedContent(
          noteRoot
        );

        noteRoot
          .querySelectorAll<HTMLAnchorElement>(
            'a[href^="#"]'
          )
          .forEach(
            (anchor) =>
              anchor.remove()
          );

        item.innerHTML =
          noteRoot.innerHTML.trim();
      }

      const back =
        document.createElement(
          "a"
        );

      back.setAttribute(
        "href",
        `#fn-ref-${number}`
      );

      back.className =
        "footnote-backref";

      back.removeAttribute(
        "target"
      );

      back.removeAttribute(
        "rel"
      );

      back.textContent =
        "↩";

      item.append(
        " ",
        back
      );

      list.appendChild(
        item
      );
    }
  );

  root.append(
    divider,
    title,
    list
  );

  return syncFootnotesHtml(
    root.innerHTML
  );
}

/* -------------------------------------------------------------------------- */
/* WORD MODAL                                                                */
/* -------------------------------------------------------------------------- */

function WordImportModal({
  open,
  settings,
  onClose,
  onImport,
}: {
  open: boolean;
  settings: EditorDefaults;
  onClose: () => void;
  onImport: (
    html: string
  ) => void;
}) {
  const inputRef =
    useRef<HTMLInputElement>(
      null
    );

  const [
    fileName,
    setFileName,
  ] = useState("");

  const [
    blocks,
    setBlocks,
  ] = useState<
    WordBlock[]
  >([]);

  const [
    footnotes,
    setFootnotes,
  ] = useState<FootnoteMap>(
    {}
  );

  const [
    startIndex,
    setStartIndex,
  ] = useState(0);

  const [
    endIndex,
    setEndIndex,
  ] = useState(0);

  const [
    includeFootnotes,
    setIncludeFootnotes,
  ] = useState(true);

  const [
    includeBibliography,
    setIncludeBibliography,
  ] = useState(false);

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const previewHtml =
    useMemo(
      () =>
        buildWordImportHtml({
          blocks,
          footnotes,
          startIndex,
          endIndex,
          includeFootnotes,
          includeBibliography,
          settings,
        }),
      [
        blocks,
        footnotes,
        startIndex,
        endIndex,
        includeFootnotes,
        includeBibliography,
        settings,
      ]
    );

  if (!open) {
    return null;
  }

  async function handleFile(
    file: File
  ) {
    setLoading(true);
    setError("");
    setFileName(
      file.name
    );

    try {
      if (
        !file.name
          .toLowerCase()
          .endsWith(
            ".docx"
          )
      ) {
        throw new Error(
          "Lütfen .docx uzantılı bir Word dosyası seçin."
        );
      }

      if (
        file.size >
        15 *
          1024 *
          1024
      ) {
        throw new Error(
          "Word dosyası 15 MB'dan büyük olamaz."
        );
      }

      const buffer =
        await file.arrayBuffer();

      const module =
        await import(
          "mammoth"
        );

      const mammoth =
        (module as any)
          .default ??
        module;

      const result =
        await mammoth.convertToHtml(
          {
            arrayBuffer:
              buffer,
          },
          {
            idPrefix:
              "word-",

            styleMap: [
              "u => u",
            ],
          }
        );

      const parsed =
        parseWordHtml(
          result.value
        );

      if (
        parsed.blocks
          .length ===
        0
      ) {
        throw new Error(
          "Word belgesinde aktarılabilir içerik bulunamadı."
        );
      }

      const start =
        detectStartIndex(
          parsed.blocks
        );

      const bibliography =
        detectBibliographyIndex(
          parsed.blocks
        );

      const end =
        bibliography >
        start
          ? bibliography -
            1
          : parsed.blocks
              .length -
            1;

      setBlocks(
        parsed.blocks
      );

      setFootnotes(
        parsed.footnotes
      );

      setStartIndex(
        start
      );

      setEndIndex(
        Math.max(
          start,
          end
        )
      );
    } catch (error) {
      console.error(
        error
      );

      setError(
        error instanceof
          Error
          ? error.message
          : "Word belgesi okunamadı."
      );

      setBlocks([]);
      setFootnotes({});
    } finally {
      setLoading(false);
    }
  }

  function blockLabel(
    block: WordBlock,
    index: number
  ) {
    const text =
      block.text.length >
      90
        ? `${block.text.slice(
            0,
            90
          )}…`
        : block.text;

    return `${index + 1}. ${text}`;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Word&apos;den Aktar
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Word biçimleri temizlenir ve panelde son kullandığınız ayarlar uygulanır.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-neutral-500 hover:bg-neutral-100"
            title="Kapat"
          >
            <X
              size={20}
            />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto p-6 lg:grid-cols-[340px_1fr]">

          <div>
            <input
              ref={
                inputRef
              }
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="hidden"
              onChange={(
                event
              ) => {
                const file =
                  event
                    .target
                    .files?.[0];

                if (file) {
                  void handleFile(
                    file
                  );
                }
              }}
            />

            <button
              type="button"
              disabled={
                loading
              }
              onClick={() =>
                inputRef.current?.click()
              }
              className="flex w-full items-center justify-center gap-2 rounded-md bg-burgundy px-4 py-3 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-60"
            >
              <Upload
                size={17}
              />

              {loading
                ? "Word okunuyor..."
                : "Word Dosyası Seç"}
            </button>

            {fileName && (
              <div className="mt-3 flex items-center gap-2 rounded-md bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
                <FileText
                  size={16}
                />

                <span className="truncate">
                  {
                    fileName
                  }
                </span>
              </div>
            )}

            {error && (
              <p className="mt-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {blocks.length >
              0 && (
              <>
                <div className="mt-6">
                  <label className="text-sm font-medium text-neutral-700">
                    Başlangıç
                  </label>

                  <select
                    value={
                      startIndex
                    }
                    onChange={(
                      event
                    ) => {
                      const value =
                        Number(
                          event
                            .target
                            .value
                        );

                      setStartIndex(
                        value
                      );

                      if (
                        value >
                        endIndex
                      ) {
                        setEndIndex(
                          value
                        );
                      }
                    }}
                    className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-burgundy"
                  >
                    {blocks.map(
                      (
                        block,
                        index
                      ) => (
                        <option
                          key={`start-${index}`}
                          value={
                            index
                          }
                        >
                          {blockLabel(
                            block,
                            index
                          )}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium text-neutral-700">
                    Bitiş
                  </label>

                  <select
                    value={
                      endIndex
                    }
                    onChange={(
                      event
                    ) =>
                      setEndIndex(
                        Number(
                          event
                            .target
                            .value
                        )
                      )
                    }
                    className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-burgundy"
                  >
                    {blocks.map(
                      (
                        block,
                        index
                      ) => (
                        <option
                          key={`end-${index}`}
                          value={
                            index
                          }
                          disabled={
                            index <
                            startIndex
                          }
                        >
                          {blockLabel(
                            block,
                            index
                          )}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div className="mt-6 space-y-3 rounded-md border border-neutral-200 bg-neutral-50 p-4">

                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={
                        includeFootnotes
                      }
                      onChange={(
                        event
                      ) =>
                        setIncludeFootnotes(
                          event
                            .target
                            .checked
                        )
                      }
                    />

                    Dipnotları aktar
                  </label>

                  <label className="flex items-center gap-2 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={
                        includeBibliography
                      }
                      onChange={(
                        event
                      ) =>
                        setIncludeBibliography(
                          event
                            .target
                            .checked
                        )
                      }
                    />

                    Kaynakçayı dahil et
                  </label>
                </div>

                <p className="mt-3 text-xs leading-5 text-neutral-500">
                  Word&apos;ün kendi font, punto ve renkleri aktarılmaz. Son kullandığınız editör ayarları uygulanır.
                </p>
              </>
            )}
          </div>

          <div className="min-h-[420px] overflow-auto rounded-md border border-neutral-200 bg-cream-light p-6">
            {blocks.length ===
            0 ? (
              <div className="flex min-h-[350px] items-center justify-center text-sm text-neutral-400">
                Önizleme için bir Word dosyası seçin.
              </div>
            ) : (
              <div
                className="publication-rich-text prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html:
                    previewHtml,
                }}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-neutral-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Vazgeç
          </button>

          <button
            type="button"
            disabled={
              !previewHtml ||
              loading
            }
            onClick={() =>
              onImport(
                previewHtml
              )
            }
            className="rounded-md bg-burgundy px-5 py-2 text-sm font-semibold text-white hover:bg-burgundy-dark disabled:opacity-50"
          >
            Makaleye Aktar
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* EDITOR                                                                     */
/* -------------------------------------------------------------------------- */

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (
    html: string
  ) => void;
}) {
  const [
    settings,
    setSettings,
  ] =
    useState<EditorDefaults>(
      DEFAULT_SETTINGS
    );

  const [
    selectedFont,
    setSelectedFont,
  ] = useState("");

  const [
    selectedSize,
    setSelectedSize,
  ] = useState(
    DEFAULT_SETTINGS.bodySize
  );

  const [
    colorMenuOpen,
    setColorMenuOpen,
  ] = useState(false);

  const [
    wordImportOpen,
    setWordImportOpen,
  ] = useState(false);

  const colorMenuRef =
    useRef<HTMLDivElement>(
      null
    );

  const editor =
    useEditor({
      extensions: [
        StarterKit,

        LinkWithExtraAttributes.configure(
          {
            openOnClick:
              false,

            autolink:
              true,

            defaultProtocol:
              "https",

            /*
             * Normal linklerde target
             * komut sırasında verilir.
             * Dipnotlar böylece varsayılan
             * olarak yeni sekmeye gitmez.
             */
            HTMLAttributes: {
              target: null,
              rel: null,
            },
          }
        ),

        BlockStyleAttributes,

        Underline,
        TextStyle,
        Color,
        FontFamily,
        FontSize,
        Image,

        Table.configure({
          resizable:
            true,
        }),

        TableRow,
        TableHeader,
        TableCell,
      ],

      content,

      immediatelyRender:
        false,

      /*
       * Burada setContent YOK.
       *
       * Word aktarımından sonra bir metin
       * seçip Bold/Italic/Font vb. tıklayınca
       * imlecin sona gitmesine neden olan
       * eski problem buydu.
       */
      onUpdate: ({
        editor:
          currentEditor,
      }) => {
        onChange(
          syncFootnotesHtml(
            currentEditor.getHTML()
          )
        );
      },

      editorProps: {
        attributes: {
          class:
            "publication-rich-text prose max-w-none min-h-[300px] px-4 py-3 outline-none " +
            "[&_table]:border-collapse [&_table]:w-full " +
            "[&_td]:border [&_td]:border-neutral-300 [&_td]:p-2 " +
            "[&_th]:border [&_th]:border-neutral-300 [&_th]:bg-neutral-100 [&_th]:p-2",
        },
      },
    });

  /* ------------------------------------------------------------------------ */
  /* LOAD SETTINGS                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const loaded =
      loadDefaults();

    setSettings(
      loaded
    );

    setSelectedFont(
      loaded.bodyFont
    );

    setSelectedSize(
      loaded.bodySize
    );
  }, []);

  /* ------------------------------------------------------------------------ */
  /* TOOLBAR STATE                                                            */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentEditor =
      editor;

    function updateToolbarState() {
      if (
        currentEditor.isActive(
          "heading",
          {
            level: 2,
          }
        )
      ) {
        setSelectedFont(
          settings.headingFont
        );

        setSelectedSize(
          settings.headingSize
        );

        return;
      }

      if (
        currentEditor.isActive(
          "heading",
          {
            level: 3,
          }
        )
      ) {
        setSelectedFont(
          settings.headingFont
        );

        setSelectedSize(
          settings.subheadingSize
        );

        return;
      }

      setSelectedFont(
        settings.bodyFont
      );

      setSelectedSize(
        settings.bodySize
      );
    }

    currentEditor.on(
      "selectionUpdate",
      updateToolbarState
    );

    return () => {
      currentEditor.off(
        "selectionUpdate",
        updateToolbarState
      );
    };
  }, [
    editor,
    settings,
  ]);

  /* ------------------------------------------------------------------------ */
  /* COLOR MENU                                                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        colorMenuRef.current &&
        !colorMenuRef.current.contains(
          event.target as Node
        )
      ) {
        setColorMenuOpen(
          false
        );
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /*
   * BURASI ÖNEMLİ.
   *
   * Bundan sonraki kod editor'ın null
   * olmadığını kesin olarak biliyor.
   */
  if (!editor) {
    return null;
  }

  const safeEditor =
    editor;

  /* ------------------------------------------------------------------------ */
  /* SETTINGS SAVE                                                            */
  /* ------------------------------------------------------------------------ */

  function saveSettings(
    next: EditorDefaults
  ) {
    setSettings(
      next
    );

    localStorage.setItem(
      "panelBodyFont",
      next.bodyFont
    );

    localStorage.setItem(
      "panelBodySize",
      String(
        next.bodySize
      )
    );

    localStorage.setItem(
      "panelBodyColor",
      next.bodyColor
    );

    localStorage.setItem(
      "panelHeadingFont",
      next.headingFont
    );

    localStorage.setItem(
      "panelHeadingColor",
      next.headingColor
    );

    localStorage.setItem(
      "panelHeadingSize",
      String(
        next.headingSize
      )
    );

    localStorage.setItem(
      "panelSubheadingSize",
      String(
        next.subheadingSize
      )
    );

    /*
     * Eski sistemle uyum.
     */
    localStorage.setItem(
      "panelLastFontFamily",
      next.bodyFont
    );
  }

  function isHeading2() {
    return safeEditor.isActive(
      "heading",
      {
        level: 2,
      }
    );
  }

  function isHeading3() {
    return safeEditor.isActive(
      "heading",
      {
        level: 3,
      }
    );
  }

  /* ------------------------------------------------------------------------ */
  /* FONT                                                                     */
  /* ------------------------------------------------------------------------ */

  function setFont(
    font: string
  ) {
    setSelectedFont(
      font
    );

    if (
      isHeading2() ||
      isHeading3()
    ) {
      const next = {
        ...settings,
        headingFont:
          font,
      };

      saveSettings(
        next
      );

      safeEditor
        .chain()
        .focus()
        .updateAttributes(
          "heading",
          {
            style:
              headingStyle(
                next,
                isHeading2()
                  ? 2
                  : 3
              ),
          }
        )
        .run();

      return;
    }

    const next = {
      ...settings,
      bodyFont: font,
    };

    saveSettings(
      next
    );

    if (font) {
      safeEditor
        .chain()
        .focus()
        .setFontFamily(
          font
        )
        .run();
    } else {
      safeEditor
        .chain()
        .focus()
        .unsetFontFamily()
        .run();
    }
  }

  /* ------------------------------------------------------------------------ */
  /* SIZE                                                                     */
  /* ------------------------------------------------------------------------ */

  function setSize(
    size: number
  ) {
    setSelectedSize(
      size
    );

    if (
      isHeading2()
    ) {
      const next = {
        ...settings,
        headingSize:
          size,
      };

      saveSettings(
        next
      );

      safeEditor
        .chain()
        .focus()
        .updateAttributes(
          "heading",
          {
            style:
              headingStyle(
                next,
                2
              ),
          }
        )
        .run();

      return;
    }

    if (
      isHeading3()
    ) {
      const next = {
        ...settings,
        subheadingSize:
          size,
      };

      saveSettings(
        next
      );

      safeEditor
        .chain()
        .focus()
        .updateAttributes(
          "heading",
          {
            style:
              headingStyle(
                next,
                3
              ),
          }
        )
        .run();

      return;
    }

    const next = {
      ...settings,
      bodySize:
        size,
    };

    saveSettings(
      next
    );

    (
      safeEditor
        .chain()
        .focus() as any
    )
      .setFontSize(
        `${size}px`
      )
      .run();
  }

  /* ------------------------------------------------------------------------ */
  /* COLOR                                                                    */
  /* ------------------------------------------------------------------------ */

  function setTextColor(
    color: string
  ) {
    if (
      isHeading2() ||
      isHeading3()
    ) {
      const next = {
        ...settings,
        headingColor:
          color,
      };

      saveSettings(
        next
      );

      safeEditor
        .chain()
        .focus()
        .updateAttributes(
          "heading",
          {
            style:
              headingStyle(
                next,
                isHeading2()
                  ? 2
                  : 3
              ),
          }
        )
        .run();

      return;
    }

    const next = {
      ...settings,
      bodyColor:
        color,
    };

    saveSettings(
      next
    );

    safeEditor
      .chain()
      .focus()
      .setColor(
        color
      )
      .run();
  }

  /* ------------------------------------------------------------------------ */
  /* HEADING                                                                  */
  /* ------------------------------------------------------------------------ */

  function makeHeading(
    level: 2 | 3
  ) {
    safeEditor
      .chain()
      .focus()
      .setHeading({
        level,
      })
      .updateAttributes(
        "heading",
        {
          style:
            headingStyle(
              settings,
              level
            ),
        }
      )
      .run();

    setSelectedFont(
      settings.headingFont
    );

    setSelectedSize(
      level === 2
        ? settings.headingSize
        : settings.subheadingSize
    );
  }

  function makeParagraph() {
    safeEditor
      .chain()
      .focus()
      .setParagraph()
      .run();

    setSelectedFont(
      settings.bodyFont
    );

    setSelectedSize(
      settings.bodySize
    );
  }

  /* ------------------------------------------------------------------------ */
  /* LINK                                                                     */
  /* ------------------------------------------------------------------------ */

  function normalizeUrl(
    value: string
  ) {
    const text =
      value.trim();

    if (
      /^https?:\/\//i.test(
        text
      )
    ) {
      return text;
    }

    return `https://${text}`;
  }

  function addOrEditLink() {
    const existing =
      safeEditor.getAttributes(
        "link"
      ).href ?? "";

    const value =
      window.prompt(
        "Bağlantı adresi:",
        existing ||
          "https://"
      );

    if (
      value === null
    ) {
      return;
    }

    if (
      !value.trim()
    ) {
      safeEditor
        .chain()
        .focus()
        .extendMarkRange(
          "link"
        )
        .unsetLink()
        .run();

      return;
    }

    const href =
      normalizeUrl(
        value
      );

    if (
      !safeEditor.state
        .selection.empty
    ) {
      safeEditor
        .chain()
        .focus()
        .setLink({
          href,
          target:
            "_blank",
          rel:
            "noopener noreferrer",
        })
        .run();

      return;
    }

    const text =
      window.prompt(
        "Linkte görünecek metin:",
        href
      );

    if (
      !text?.trim()
    ) {
      return;
    }

    safeEditor
      .chain()
      .focus()
      .insertContent({
        type: "text",

        text:
          text.trim(),

        marks: [
          {
            type: "link",

            attrs: {
              href,

              target:
                "_blank",

              rel:
                "noopener noreferrer",
            },
          },
        ],
      })
      .run();
  }

  /* ------------------------------------------------------------------------ */
  /* MANUAL FOOTNOTE                                                          */
  /* ------------------------------------------------------------------------ */

  function addFootnote() {
    const noteText =
      window.prompt(
        "Dipnot metni:"
      );

    if (
      !noteText?.trim()
    ) {
      return;
    }

    const sourceUrl =
      window.prompt(
        "Kaynak bağlantısı varsa yazın. Yoksa boş bırakın:"
      )?.trim() ?? "";

    const key =
      `manual-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

    /*
     * Referans imlecin olduğu yere eklenir.
     */
    safeEditor
      .chain()
      .focus()
      .insertContent(
        `<a href="#fn-temp" class="footnote-ref" data-footnote-key="${key}">1</a>`
      )
      .run();

    /*
     * Dipnot metni makalenin altına eklenir.
     *
     * Bu sadece kullanıcı yeni dipnot eklediğinde
     * setContent çalıştırır; toolbar kullanılırken
     * otomatik setContent yapılmaz.
     */
    const html =
      appendManualFootnote(
        safeEditor.getHTML(),
        key,
        noteText.trim(),
        sourceUrl,
        settings
      );

    safeEditor.commands.setContent(
      html,
      {
        emitUpdate:
          true,
      }
    );
  }

  /* ------------------------------------------------------------------------ */
  /* IMAGE                                                                    */
  /* ------------------------------------------------------------------------ */

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const supabase =
      createClient();

    const fileName =
      `${Date.now()}-${file.name}`;

    const {
      error,
    } =
      await supabase.storage
        .from(
          "publication-images"
        )
        .upload(
          fileName,
          file
        );

    if (error) {
      alert(
        "Görsel yüklenemedi: " +
          error.message
      );

      return;
    }

    const {
      data,
    } =
      supabase.storage
        .from(
          "publication-images"
        )
        .getPublicUrl(
          fileName
        );

    safeEditor
      .chain()
      .focus()
      .setImage({
        src:
          data.publicUrl,
      })
      .run();

    event.target.value =
      "";
  }

  const buttonClass =
    "rounded p-2 hover:bg-neutral-100";

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <div className="rounded-md border border-neutral-300 bg-white">

        <div className="flex flex-wrap items-center gap-1 border-b border-neutral-200 p-2">

          {/* FONT */}
          <select
            value={
              selectedFont
            }
            onChange={(
              event
            ) =>
              setFont(
                event.target
                  .value
              )
            }
            className="rounded border border-neutral-200 px-2 py-1.5 text-sm outline-none"
          >
            {FONT_OPTIONS.map(
              (option) => (
                <option
                  key={
                    option.label
                  }
                  value={
                    option.value
                  }
                >
                  {
                    option.label
                  }
                </option>
              )
            )}
          </select>

          {/* SIZE */}
          <select
            value={
              selectedSize
            }
            onChange={(
              event
            ) =>
              setSize(
                Number(
                  event.target
                    .value
                )
              )
            }
            className="rounded border border-neutral-200 px-2 py-1.5 text-sm outline-none"
          >
            {SIZE_OPTIONS.map(
              (size) => (
                <option
                  key={
                    size
                  }
                  value={
                    size
                  }
                >
                  {size}
                </option>
              )
            )}
          </select>

          {/* COLOR */}
          <div
            ref={
              colorMenuRef
            }
            className="relative"
          >
            <button
              type="button"
              className={
                buttonClass
              }
              onClick={() =>
                setColorMenuOpen(
                  (value) =>
                    !value
                )
              }
              title="Metin rengi"
            >
              <Palette
                size={16}
              />
            </button>

            {colorMenuOpen && (
              <div className="absolute left-0 top-full z-30 mt-1 w-max rounded-md border border-neutral-200 bg-white p-3 shadow-lg">

                <div className="grid grid-cols-5 gap-1.5">
                  {COLOR_SWATCHES.map(
                    (color) => (
                      <button
                        key={
                          color
                        }
                        type="button"
                        className="h-6 w-6 rounded border border-neutral-300"
                        style={{
                          backgroundColor:
                            color,
                        }}
                        title={
                          color
                        }
                        onClick={() => {
                          setTextColor(
                            color
                          );

                          setColorMenuOpen(
                            false
                          );
                        }}
                      />
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mx-1 h-6 w-px bg-neutral-200" />

          {/* TEXT / HEADINGS */}
          <button
            type="button"
            onClick={
              makeParagraph
            }
            className={`${buttonClass} text-xs font-medium ${
              safeEditor.isActive(
                "paragraph"
              )
                ? "bg-neutral-200"
                : ""
            }`}
            title="Normal metin"
          >
            Metin
          </button>

          <button
            type="button"
            onClick={() =>
              makeHeading(2)
            }
            className={`${buttonClass} text-xs font-bold ${
              isHeading2()
                ? "bg-neutral-200"
                : ""
            }`}
            title="Başlık"
          >
            Başlık
          </button>

          <button
            type="button"
            onClick={() =>
              makeHeading(3)
            }
            className={`${buttonClass} text-xs font-bold ${
              isHeading3()
                ? "bg-neutral-200"
                : ""
            }`}
            title="Alt başlık"
          >
            Alt Başlık
          </button>

          <div className="mx-1 h-6 w-px bg-neutral-200" />

          {/* BOLD */}
          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={`${buttonClass} ${
              safeEditor.isActive(
                "bold"
              )
                ? "bg-neutral-200"
                : ""
            }`}
            title="Kalın"
          >
            <Bold
              size={16}
            />
          </button>

          {/* ITALIC */}
          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={`${buttonClass} ${
              safeEditor.isActive(
                "italic"
              )
                ? "bg-neutral-200"
                : ""
            }`}
            title="İtalik"
          >
            <Italic
              size={16}
            />
          </button>

          {/* UNDERLINE */}
          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .toggleUnderline()
                .run()
            }
            className={`${buttonClass} ${
              safeEditor.isActive(
                "underline"
              )
                ? "bg-neutral-200"
                : ""
            }`}
            title="Altı çizili"
          >
            <UnderlineIcon
              size={16}
            />
          </button>

          {/* BULLET LIST */}
          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .toggleBulletList()
                .run()
            }
            className={`${buttonClass} ${
              safeEditor.isActive(
                "bulletList"
              )
                ? "bg-neutral-200"
                : ""
            }`}
            title="Madde işaretli liste"
          >
            <List
              size={16}
            />
          </button>

          {/* ORDERED LIST */}
          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .toggleOrderedList()
                .run()
            }
            className={`${buttonClass} ${
              safeEditor.isActive(
                "orderedList"
              )
                ? "bg-neutral-200"
                : ""
            }`}
            title="Numaralı liste"
          >
            <ListOrdered
              size={16}
            />
          </button>

          <div className="mx-1 h-6 w-px bg-neutral-200" />

          {/* LINK */}
          <button
            type="button"
            onClick={
              addOrEditLink
            }
            className={
              buttonClass
            }
            title="Link ekle veya düzenle"
          >
            <LinkIcon
              size={16}
            />
          </button>

          {/* UNLINK */}
          <button
            type="button"
            disabled={
              !safeEditor.isActive(
                "link"
              )
            }
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .extendMarkRange(
                  "link"
                )
                .unsetLink()
                .run()
            }
            className={`${buttonClass} disabled:opacity-30`}
            title="Linki kaldır"
          >
            <Unlink
              size={16}
            />
          </button>

          {/* FOOTNOTE */}
          <button
            type="button"
            onClick={
              addFootnote
            }
            className="flex h-8 w-8 items-center justify-center rounded font-serif font-bold hover:bg-neutral-100"
            title="Dipnot ekle"
          >
            ¹
          </button>

          {/* WORD */}
          <button
            type="button"
            onClick={() =>
              setWordImportOpen(
                true
              )
            }
            className={
              buttonClass
            }
            title="Word'den aktar"
          >
            <FileUp
              size={16}
            />
          </button>

          {/* IMAGE */}
          <label
            className="cursor-pointer rounded p-2 hover:bg-neutral-100"
            title="Görsel ekle"
          >
            <ImageIcon
              size={16}
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={
                handleImageUpload
              }
            />
          </label>

          <div className="mx-1 h-6 w-px bg-neutral-200" />

          {/* TABLE */}
          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .insertTable({
                  rows: 3,
                  cols: 3,
                  withHeaderRow:
                    true,
                })
                .run()
            }
            className={
              buttonClass
            }
            title="Tablo ekle"
          >
            <TableIcon
              size={16}
            />
          </button>

          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .addColumnAfter()
                .run()
            }
            className={
              buttonClass
            }
            title="Sütun ekle"
          >
            <Columns
              size={16}
            />
          </button>

          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .addRowAfter()
                .run()
            }
            className={
              buttonClass
            }
            title="Satır ekle"
          >
            <Rows
              size={16}
            />
          </button>

          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .deleteTable()
                .run()
            }
            className="rounded p-2 text-red-600 hover:bg-neutral-100"
            title="Tabloyu sil"
          >
            <Trash2
              size={16}
            />
          </button>

          <div className="mx-1 h-6 w-px bg-neutral-200" />

          {/* UNDO */}
          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .undo()
                .run()
            }
            className={
              buttonClass
            }
            title="Geri al"
          >
            <Undo
              size={16}
            />
          </button>

          {/* REDO */}
          <button
            type="button"
            onClick={() =>
              safeEditor
                .chain()
                .focus()
                .redo()
                .run()
            }
            className={
              buttonClass
            }
            title="İleri al"
          >
            <Redo
              size={16}
            />
          </button>
        </div>

        <EditorContent
          editor={
            safeEditor
          }
        />
      </div>

      <WordImportModal
        open={
          wordImportOpen
        }
        settings={
          settings
        }
        onClose={() =>
          setWordImportOpen(
            false
          )
        }
        onImport={(html) => {
          if (
            safeEditor
              .getText()
              .trim() &&
            !window.confirm(
              "Mevcut içerik Word belgesiyle değiştirilecek. Devam edilsin mi?"
            )
          ) {
            return;
          }

          const cleaned =
            syncFootnotesHtml(
              html
            );

          safeEditor.commands.setContent(
            cleaned,
            {
              emitUpdate:
                true,
            }
          );

          setWordImportOpen(
            false
          );
        }}
      />
    </>
  );
}