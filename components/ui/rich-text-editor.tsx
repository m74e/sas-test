"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { FontFamily } from "@tiptap/extension-font-family";
import { FontSize } from "@tiptap/extension-font-size";
import { useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

const FONT_FAMILIES = [
  { label: "Default", value: "" },
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Verdana", value: "Verdana, sans-serif" },
];

const FONT_SIZES = [
  { label: "12px", value: "12px" },
  { label: "14px", value: "14px" },
  { label: "16px", value: "16px" },
  { label: "18px", value: "18px" },
  { label: "20px", value: "20px" },
  { label: "24px", value: "24px" },
];

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write content here…",
  label,
  id,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      Underline,
      TextStyle,
      FontFamily,
      FontSize,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[10rem] w-full px-3 py-3 text-sm text-[#FF62FC] outline-none prose prose-invert prose-p:my-1 prose-p:first:mt-0 prose-p:last:mb-0 max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const syncFromValue = useCallback(() => {
    if (!editor) return;
    const current = editor.getHTML();
    const normalized = value || "";
    if (normalized === "" && current !== "<p></p>" && current !== "") {
      editor.commands.setContent("");
    }
  }, [editor, value]);

  useEffect(syncFromValue, [syncFromValue]);

  if (!editor) {
    return (
      <div
        className={cn(
          "min-h-[10rem] w-full rounded-2xl border border-[#FF62FC] bg-black/40 px-3 py-3 text-sm text-[#FF62FC]/70",
          className
        )}
      >
        {placeholder}
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs capitalize text-[#FF62FC]"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex flex-wrap items-center gap-1 rounded-t-2xl border border-b-0 border-[#FF62FC] bg-black/60 p-2"
        )}
      >
        <select
          className="h-8 min-w-[7rem] rounded border border-[#FF62FC]/60 bg-black/60 px-2 text-xs text-[#FF62FC] outline-none focus:ring-1 focus:ring-[#FF62FC]"
          value={
            editor.getAttributes("textStyle").fontFamily ?? ""
          }
          onChange={(e) => {
            const v = e.target.value;
            const attrs = editor.getAttributes("textStyle");
            editor
              .chain()
              .focus()
              .setMark("textStyle", {
                ...attrs,
                fontFamily: v || null,
              })
              .run();
          }}
        >
          {FONT_FAMILIES.map((f) => (
            <option key={f.value || "default"} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
        <select
          className="h-8 min-w-[5rem] rounded border border-[#FF62FC]/60 bg-black/60 px-2 text-xs text-[#FF62FC] outline-none focus:ring-1 focus:ring-[#FF62FC]"
          value={editor.getAttributes("textStyle").fontSize ?? ""}
          onChange={(e) => {
            const v = e.target.value;
            const attrs = editor.getAttributes("textStyle");
            editor
              .chain()
              .focus()
              .setMark("textStyle", {
                ...attrs,
                fontSize: v || null,
              })
              .run();
          }}
        >
          <option value="">Size</option>
          {FONT_SIZES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="mx-1 h-6 w-px bg-[#FF62FC]/40" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "rounded p-1.5 text-[#FF62FC] hover:bg-[#FF62FC]/20",
            editor.isActive("bold") && "bg-[#FF62FC]/30"
          )}
          title="Bold"
        >
          <Bold className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "rounded p-1.5 text-[#FF62FC] hover:bg-[#FF62FC]/20",
            editor.isActive("italic") && "bg-[#FF62FC]/30"
          )}
          title="Italic"
        >
          <Italic className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "rounded p-1.5 text-[#FF62FC] hover:bg-[#FF62FC]/20",
            editor.isActive("underline") && "bg-[#FF62FC]/30"
          )}
          title="Underline"
        >
          <UnderlineIcon className="size-4" />
        </button>
        <div className="mx-1 h-6 w-px bg-[#FF62FC]/40" />
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={cn(
            "rounded p-1.5 text-[#FF62FC] hover:bg-[#FF62FC]/20",
            editor.isActive({ textAlign: "left" }) && "bg-[#FF62FC]/30"
          )}
          title="Align left"
        >
          <AlignLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={cn(
            "rounded p-1.5 text-[#FF62FC] hover:bg-[#FF62FC]/20",
            editor.isActive({ textAlign: "center" }) && "bg-[#FF62FC]/30"
          )}
          title="Align center"
        >
          <AlignCenter className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={cn(
            "rounded p-1.5 text-[#FF62FC] hover:bg-[#FF62FC]/20",
            editor.isActive({ textAlign: "right" }) && "bg-[#FF62FC]/30"
          )}
          title="Align right"
        >
          <AlignRight className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={cn(
            "rounded p-1.5 text-[#FF62FC] hover:bg-[#FF62FC]/20",
            editor.isActive({ textAlign: "justify" }) && "bg-[#FF62FC]/30"
          )}
          title="Justify"
        >
          <AlignJustify className="size-4" />
        </button>
      </div>
      <div
        id={id}
        className={cn(
          "rounded-b-2xl border border-[#FF62FC] bg-black/40 outline-none transition-[box-shadow]",
          "focus-within:ring-[#FF62FC]/40 focus-within:ring-[3px]"
        )}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
