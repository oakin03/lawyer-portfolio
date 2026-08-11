"use client";

import { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent, Extension } from "@tiptap/react";
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
  ImageIcon,
  TableIcon,
  Columns,
  Rows,
  Trash2,
  Undo,
  Redo,
  Palette,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// Tiptap doesn't ship an official font-size extension, so we extend TextStyle
// with a `fontSize` attribute ourselves — same pattern Tiptap's own docs recommend.
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element: HTMLElement) => element.style.fontSize || null,
            renderHTML: (attributes: { fontSize?: string | null }) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
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
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }: { chain: () => any }) =>
          chain().setMark("textStyle", { fontSize: null }).run(),
    };
  },
});

// "Varsayılan" (empty value) unsets the font, letting the editor inherit the
// site's own default font (Geist) — matching what the public page renders.
const FONT_OPTIONS = [
  { label: "Varsayılan (Son Kullanılan)", value: "" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Helvetica", value: "Helvetica, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Comic Sans MS", value: "'Comic Sans MS', cursive" },
  { label: "Impact", value: "Impact, sans-serif" },
  { label: "Palatino Linotype", value: "'Palatino Linotype', serif" },
  { label: "Book Antiqua", value: "'Book Antiqua', serif" },
  { label: "Century Gothic", value: "'Century Gothic', sans-serif" },
  { label: "Lucida Sans Unicode", value: "'Lucida Sans Unicode', sans-serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Calibri", value: "Calibri, sans-serif" },
  { label: "Cambria", value: "Cambria, serif" },
  { label: "Playfair Display", value: "'Playfair Display', serif" },
];

// Word's actual step pattern between 12 and 48 (no 13, 15, etc.)
const SIZE_OPTIONS = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48];

const COLOR_SWATCHES = [
  "#FFFFFF", "#000000", "#7a1f2b", "#D4AF37",
  "#404040", "#808080", "#BFBFBF",
  "#C00000", "#FF0000", "#FFA500", "#FFD700",
  "#92D050", "#00B050", "#00B0F0", "#0070C0", "#002060",
  "#7030A0", "#FF66CC", "#843C0C", "#BF9000",
];

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const [colorMenuOpen, setColorMenuOpen] = useState(false);
  const colorMenuRef = useRef<HTMLDivElement>(null);
  const [selectedFont, setSelectedFont] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Underline,
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class:
          "prose max-w-none min-h-[300px] px-4 py-3 outline-none " +
          "[&_table]:border-collapse [&_table]:w-full [&_td]:border [&_td]:border-neutral-300 [&_td]:p-2 " +
          "[&_th]:border [&_th]:border-neutral-300 [&_th]:bg-neutral-100 [&_th]:p-2",
      },
    },
  });

  useEffect(() => {
    const lastFont = window.localStorage.getItem("panelLastFontFamily") ?? "";
    setSelectedFont(lastFont);

    // Only auto-apply to brand-new (empty) articles — never overwrite existing formatting
    if (editor && !content && lastFont) {
      editor.chain().focus().setFontFamily(lastFont).run();
    }
  }, [editor]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (colorMenuRef.current && !colorMenuRef.current.contains(e.target as Node)) {
        setColorMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!editor) return null;

  function addLink() {
    const url = window.prompt("URL:");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const supabase = createClient();
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("publication-images").upload(fileName, file);

    if (error) {
      alert("Görsel yüklenemedi: " + error.message);
      return;
    }

    const { data } = supabase.storage.from("publication-images").getPublicUrl(fileName);
    editor?.chain().focus().setImage({ src: data.publicUrl }).run();
    e.target.value = "";
  }

  return (
    <div className="rounded-md border border-neutral-300 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-neutral-200 p-2">
        {/* Font group — matches Word's ordering: font, size, color first */}
          <select
            value={selectedFont}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedFont(value);
              window.localStorage.setItem("panelLastFontFamily", value);

              if (value) {
                editor.chain().focus().setFontFamily(value).run();
              } else {
                editor.chain().focus().unsetFontFamily().run();
              }
            }}
            className="rounded border border-neutral-200 px-2 py-1.5 text-sm outline-none"
          >
          {FONT_OPTIONS.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <select
          onChange={(e) => {
            const value = e.target.value;
            (editor.chain().focus() as any).setFontSize(`${value}px`).run();
          }}
          className="rounded border border-neutral-200 px-2 py-1.5 text-sm outline-none"
          defaultValue="18"
        >
          {SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <div className="relative" ref={colorMenuRef}>
          <button
            type="button"
            onClick={() => setColorMenuOpen((prev) => !prev)}
            className="flex items-center gap-1 rounded border border-neutral-200 px-2 py-1.5 hover:bg-neutral-100"
            title="Metin rengi"
          >
            <Palette size={16} />
          </button>
          {colorMenuOpen && (
            <div className="absolute left-0 top-full z-20 mt-1 w-max rounded-md border border-neutral-200 bg-white p-3 shadow-lg">
              <p className="mb-2 text-xs font-medium text-neutral-500">Standart Renkler</p>
              <div className="grid grid-cols-5 gap-1.5">
                {COLOR_SWATCHES.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      editor.chain().focus().setColor(color).run();
                      setColorMenuOpen(false);
                    }}
                    style={{ backgroundColor: color }}
                    title={color}
                    className="h-6 w-6 rounded border border-neutral-300"
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  editor.chain().focus().unsetColor().run();
                  setColorMenuOpen(false);
                }}
                className="mt-2 w-full rounded border border-neutral-200 px-2 py-1 text-xs text-neutral-500 hover:bg-neutral-100"
              >
                Rengi Sıfırla
              </button>
            </div>
          )}
        </div>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Basic formatting */}
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} title="Kalın" className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("bold") ? "bg-neutral-200" : ""}`}>
          <Bold size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} title="İtalik" className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("italic") ? "bg-neutral-200" : ""}`}>
          <Italic size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} title="Altı Çizili" className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("underline") ? "bg-neutral-200" : ""}`}>
          <UnderlineIcon size={16} />
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Lists */}
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} title="Madde İşaretli Liste" className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("bulletList") ? "bg-neutral-200" : ""}`}>
          <List size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numaralı Liste" className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("orderedList") ? "bg-neutral-200" : ""}`}>
          <ListOrdered size={16} />
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Insert: link, image, table */}
        <button type="button" onClick={addLink} className="rounded p-2 hover:bg-neutral-100" title="Bağlantı ekle">
          <LinkIcon size={16} />
        </button>

        <label className="cursor-pointer rounded p-2 hover:bg-neutral-100" title="Görsel ekle">
          <ImageIcon size={16} />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>

        <button
          type="button"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          className="rounded p-2 hover:bg-neutral-100"
          title="Tablo ekle"
        >
          <TableIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addColumnAfter().run()}
          className="rounded p-2 hover:bg-neutral-100"
          title="Sütun ekle"
        >
          <Columns size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().addRowAfter().run()}
          className="rounded p-2 hover:bg-neutral-100"
          title="Satır ekle"
        >
          <Rows size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().deleteTable().run()}
          className="rounded p-2 text-red-600 hover:bg-neutral-100"
          title="Tabloyu sil"
        >
          <Trash2 size={16} />
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        {/* Undo / redo — last, matching Word's convention */}
        <button type="button" onClick={() => editor.chain().focus().undo().run()} title="Geri Al" className="rounded p-2 hover:bg-neutral-100">
          <Undo size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} title="İleri Al" className="rounded p-2 hover:bg-neutral-100">
          <Redo size={16} />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}