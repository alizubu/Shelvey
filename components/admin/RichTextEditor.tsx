"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "@/components/layout/ThemeProvider";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder = "Start writing..." }: RichTextEditorProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [wordCount, setWordCount] = useState({ words: 0, chars: 0, paragraphs: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      onChange(html);
      updateCounts(ed.getText());
    },
    editorProps: {
      attributes: {
        class: "rich-editor-content",
        style: `
          min-height: 180px;
          padding: 16px 18px;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 0.92rem;
          line-height: 1.8;
          color: var(--color-text);
        `,
      },
    },
  });

  // Sync external value changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const updateCounts = useCallback((text: string) => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const paragraphs = text.trim() ? text.trim().split(/\n\n+/).length : 0;
    setWordCount({ words, chars, paragraphs });
  }, []);

  useEffect(() => {
    if (editor) updateCounts(editor.getText());
  }, [editor, updateCounts]);

  if (!editor) return null;

  const ToolBtn = ({ active, onClick, title, children }: {
    active?: boolean; onClick: () => void; title: string; children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      style={{
        width: "30px", height: "30px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: active ? "var(--color-accent-bg)" : "transparent",
        border: `1px solid ${active ? "var(--color-accent)" : "transparent"}`,
        borderRadius: "4px",
        color: active ? "var(--color-accent)" : "var(--color-text-muted)",
        cursor: "pointer",
        fontSize: "0.78rem",
        fontWeight: active ? 700 : 500,
        transition: "all 0.15s ease",
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      {children}
    </button>
  );

  const Divider = () => (
    <div style={{ width: "1px", height: "20px", background: "var(--color-border)", margin: "0 4px" }} />
  );

  return (
    <div style={{
      border: "1px solid var(--color-border)",
      borderRadius: "8px",
      overflow: "hidden",
      background: "var(--color-bg)",
      transition: "border-color 0.2s ease",
    }}>
      {/* ── Toolbar ── */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "2px",
        padding: "8px 12px",
        borderBottom: "1px solid var(--color-border)",
        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
      }}>
        {/* Text formatting */}
        <ToolBtn active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold (Ctrl+B)">
          B
        </ToolBtn>
        <ToolBtn active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic (Ctrl+I)">
          <em>I</em>
        </ToolBtn>
        <ToolBtn active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough">
          <s>S</s>
        </ToolBtn>
        <ToolBtn active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()} title="Inline Code">
          {"<>"}
        </ToolBtn>

        <Divider />

        {/* Headings */}
        <ToolBtn active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">
          H2
        </ToolBtn>
        <ToolBtn active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} title="Heading 3">
          H3
        </ToolBtn>

        <Divider />

        {/* Lists */}
        <ToolBtn active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet List">
          •
        </ToolBtn>
        <ToolBtn active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered List">
          1.
        </ToolBtn>

        <Divider />

        {/* Alignment */}
        <ToolBtn active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()} title="Align Left">
          <span style={{ fontSize: "0.65rem", lineHeight: 1 }}>⫷</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()} title="Align Center">
          <span style={{ fontSize: "0.65rem", lineHeight: 1 }}>⫸</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()} title="Align Right">
          <span style={{ fontSize: "0.65rem", lineHeight: 1 }}>⫸</span>
        </ToolBtn>
        <ToolBtn active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()} title="Justify">
          <span style={{ fontSize: "0.65rem", lineHeight: 1 }}>☰</span>
        </ToolBtn>

        <Divider />

        {/* Block */}
        <ToolBtn active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()} title="Quote">
          &ldquo;
        </ToolBtn>
        <ToolBtn active={editor.isActive("codeBlock")} onClick={() => editor.chain().focus().toggleCodeBlock().run()} title="Code Block">
          {"{ }"}
        </ToolBtn>
        <ToolBtn active={false} onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
          —
        </ToolBtn>

        <Divider />

        {/* Undo/Redo */}
        <ToolBtn active={false} onClick={() => editor.chain().focus().undo().run()} title="Undo (Ctrl+Z)">
          ↩
        </ToolBtn>
        <ToolBtn active={false} onClick={() => editor.chain().focus().redo().run()} title="Redo (Ctrl+Y)">
          ↪
        </ToolBtn>

        <Divider />

        {/* Clear formatting */}
        <ToolBtn active={false} onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} title="Clear Formatting">
          ✕
        </ToolBtn>

        {/* Case toggle */}
        <ToolBtn active={false} onClick={() => {
          const { from, to } = editor.state.selection;
          const text = editor.state.doc.textBetween(from, to);
          if (!text) return;
          const isUpper = text === text.toUpperCase();
          const newText = isUpper ? text.toLowerCase() : text.toUpperCase();
          editor.chain().focus().insertContentAt({ from, to }, newText).run();
        }} title="Toggle Case">
          Aa
        </ToolBtn>
      </div>

      {/* ── Editor Content ── */}
      <EditorContent editor={editor} />

      {/* ── Footer: Word count ── */}
      <div style={{
        display: "flex",
        gap: "16px",
        padding: "8px 14px",
        borderTop: "1px solid var(--color-border)",
        background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: "0.58rem",
        color: "var(--color-text-dim)",
        letterSpacing: "0.08em",
      }}>
        <span>{wordCount.words} words</span>
        <span>{wordCount.chars} chars</span>
        <span>{wordCount.paragraphs} paragraphs</span>
      </div>
    </div>
  );
}
