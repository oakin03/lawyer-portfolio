"use client";

import { useEditor, EditorContent, Extension } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { FontFamily } from "@tiptap/extension-font-family";
import { Bold, Italic, List, ListOrdered, Link as LinkIcon, Undo, Redo } from "lucide-react";

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

const FONT_OPTIONS = [
  { label: "Varsayılan", value: "" },
  { label: "Serif", value: "Georgia, serif" },
  { label: "Sans Serif", value: "Arial, sans-serif" },
  { label: "Monospace", value: "monospace" },
];

const SIZE_OPTIONS = [
  { label: "Küçük", value: "14px" },
  { label: "Normal", value: "16px" },
  { label: "Büyük", value: "20px" },
  { label: "Başlık", value: "28px" },
];

export default function RichTextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[300px] px-4 py-3 outline-none",
      },
    },
  });

  if (!editor) return null;

  function addLink() {
    const url = window.prompt("URL:");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  }

  return (
    <div className="rounded-md border border-neutral-300 bg-white">
      <div className="flex flex-wrap items-center gap-1 border-b border-neutral-200 p-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("bold") ? "bg-neutral-200" : ""}`}>
          <Bold size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("italic") ? "bg-neutral-200" : ""}`}>
          <Italic size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("bulletList") ? "bg-neutral-200" : ""}`}>
          <List size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`rounded p-2 hover:bg-neutral-100 ${editor.isActive("orderedList") ? "bg-neutral-200" : ""}`}>
          <ListOrdered size={16} />
        </button>
        <button type="button" onClick={addLink} className="rounded p-2 hover:bg-neutral-100">
          <LinkIcon size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className="rounded p-2 hover:bg-neutral-100">
          <Undo size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className="rounded p-2 hover:bg-neutral-100">
          <Redo size={16} />
        </button>

        <div className="mx-1 h-6 w-px bg-neutral-200" />

        <select
          onChange={(e) => {
            const value = e.target.value;
            if (value) {
              editor.chain().focus().setFontFamily(value).run();
            } else {
              editor.chain().focus().unsetFontFamily().run();
            }
          }}
          className="rounded border border-neutral-200 px-2 py-1.5 text-sm outline-none"
          defaultValue=""
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
            if (value) {
              (editor.chain().focus() as any).setFontSize(value).run();
            } else {
              (editor.chain().focus() as any).unsetFontSize().run();
            }
          }}
          className="rounded border border-neutral-200 px-2 py-1.5 text-sm outline-none"
          defaultValue=""
        >
          <option value="">Boyut</option>
          {SIZE_OPTIONS.map((opt) => (
            <option key={opt.label} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <input
          type="color"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          className="h-8 w-8 cursor-pointer rounded border border-neutral-200"
          title="Metin rengi"
        />
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetColor().run()}
          className="rounded border border-neutral-200 px-2 py-1.5 text-xs text-neutral-500 hover:bg-neutral-100"
        >
          Rengi Sıfırla
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}