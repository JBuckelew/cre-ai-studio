"use client";

import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";

function ToolbarButton({
  active,
  onClick,
  label,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`rounded-lg px-2.5 py-1 text-sm font-semibold transition-colors ${
        active ? "bg-terracotta text-card" : "text-ink-soft hover:bg-cream"
      }`}
    >
      {children}
    </button>
  );
}

export function TiptapEditor({
  initialContent,
  onUpdate,
  onEditorReady,
}: {
  initialContent: unknown;
  onUpdate: (json: unknown) => void;
  onEditorReady?: (editor: Editor) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "What happened? The little details are the best part…",
      }),
    ],
    content: (initialContent as object) ?? undefined,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onUpdate(editor.getJSON()),
    onCreate: ({ editor }) => onEditorReady?.(editor),
  });

  if (!editor) {
    return <div className="min-h-56 rounded-2xl bg-cream/60 animate-pulse" />;
  }

  return (
    <div>
      <div className="flex items-center gap-1 border-b border-line pb-2 mb-3 flex-wrap">
        <ToolbarButton
          label="Bold"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <span className="italic font-serif">I</span>
        </ToolbarButton>
        <ToolbarButton
          label="Heading"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          H
        </ToolbarButton>
        <ToolbarButton
          label="Bullet list"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • List
        </ToolbarButton>
        <ToolbarButton
          label="Quote"
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          &ldquo;&rdquo;
        </ToolbarButton>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
