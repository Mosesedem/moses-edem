"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { common, createLowlight } from "lowlight";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Heading2,
  Heading3,
  Link2,
  Image as ImageIcon,
  Undo,
  Redo,
  Upload,
  Loader2,
  Youtube as YoutubeIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Table as TableIcon,
  Maximize2,
  Minimize2,
  X,
  Rows3,
  Columns3,
  Trash2,
  ArrowUpFromLine,
  ArrowDownFromLine,
  ArrowLeftFromLine,
  ArrowRightFromLine,
  Heading,
} from "lucide-react";
import {
  useCallback,
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type ChangeEvent,
} from "react";
import { toast } from "sonner";

const lowlight = createLowlight(common);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

function countWords(html: string): number {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean).length;
}

function estimateReadingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "bg-muted text-foreground" : "text-muted-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return <div className="mx-0.5 h-6 w-px shrink-0 self-center bg-border" />;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing your blog post...",
}: RichTextEditorProps) {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [, setSelectionTick] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    onSelectionUpdate: () => setSelectionTick((n) => n + 1),
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      onChange(html);
      setWordCount(countWords(html));
      setSelectionTick((n) => n + 1);
    },
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Table.configure({
        resizable: true,
        HTMLAttributes: { class: "blog-editor-table" },
      }),
      TableRow,
      TableHeader.configure({
        HTMLAttributes: { class: "blog-editor-th" },
      }),
      TableCell.configure({
        HTMLAttributes: { class: "blog-editor-td" },
      }),
      Image.configure({
        HTMLAttributes: { class: "rounded-lg max-w-full h-auto my-4" },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-accent underline underline-offset-2 hover:opacity-80",
        },
      }),
      Placeholder.configure({ placeholder }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class:
            "rounded-lg border border-border bg-muted p-4 my-4 overflow-x-auto font-mono text-sm",
        },
      }),
      Youtube.configure({
        width: 640,
        height: 360,
        HTMLAttributes: { class: "rounded-lg my-4 mx-auto max-w-full" },
        nocookie: true,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "blog-editor focus:outline-none min-h-[320px] px-3 py-4 sm:px-4 sm:min-h-[400px]",
      },
    },
  });

  useEffect(() => {
    if (content) setWordCount(countWords(content));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const readingTime = estimateReadingTime(wordCount);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsFullscreen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    document.body.style.overflow = "";
  }, [isFullscreen]);

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!cloud || !preset) {
      throw new Error(
        "Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET, or paste an image URL."
      );
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      { method: "POST", body: formData }
    );

    if (!response.ok) throw new Error("Upload failed");
    const data = (await response.json()) as { secure_url: string };
    return data.secure_url;
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size must be less than 10MB");
      return;
    }

    setUploadingImage(true);
    try {
      const url = await uploadImageToCloudinary(file);
      editor?.chain().focus().setImage({ src: url }).run();
      setShowImageDialog(false);
      toast.success("Image uploaded");
    } catch (err) {
      console.error(err);
      toast.error(
        err instanceof Error ? err.message : "Failed to upload image"
      );
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const insertImageFromUrl = useCallback(() => {
    if (!imageUrl || !editor) return;
    editor.chain().focus().setImage({ src: imageUrl }).run();
    setImageUrl("");
    setShowImageDialog(false);
    toast.success("Image added");
  }, [editor, imageUrl]);

  const insertVideo = useCallback(() => {
    if (!videoUrl || !editor) return;

    const youtubeRegex =
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;

    if (youtubeRegex.test(videoUrl)) {
      editor.commands.setYoutubeVideo({
        src: videoUrl,
        width: 640,
        height: 360,
      });
      toast.success("YouTube video added");
    } else {
      const iframe = `<div class="video-embed my-4"><iframe src="${videoUrl}" width="640" height="360" frameborder="0" allowfullscreen class="rounded-lg mx-auto max-w-full"></iframe></div>`;
      editor.commands.insertContent(iframe);
      toast.success("Video embed added");
    }

    setVideoUrl("");
    setShowVideoDialog(false);
  }, [editor, videoUrl]);

  const setLink = useCallback(() => {
    if (!editor || !linkUrl) return;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: linkUrl })
      .run();
    setLinkUrl("");
    setShowLinkDialog(false);
  }, [editor, linkUrl]);

  const unsetLink = useCallback(() => {
    if (!editor) return;
    editor.chain().focus().unsetLink().run();
    setShowLinkDialog(false);
  }, [editor]);

  const insertTable = useCallback(() => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  }, [editor]);

  const inTable = Boolean(editor?.isActive("table"));

  if (!editor) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-border bg-card text-sm text-muted-foreground">
        Loading editor…
      </div>
    );
  }

  const wrapperClass = isFullscreen
    ? "fixed inset-0 z-[80] flex flex-col bg-background"
    : "overflow-hidden rounded-lg border border-border bg-card shadow-sm";

  const editorAreaClass = isFullscreen
    ? "min-h-0 flex-1 overflow-y-auto"
    : "min-h-[400px]";

  const stickyChromeClass = isFullscreen
    ? "sticky top-0 z-30 shrink-0 border-b border-border bg-muted/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-muted/80"
    : "sticky top-14 z-30 border-b border-border bg-muted/90 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-muted/80 lg:top-0";

  const panelInputClass =
    "min-w-[12rem] flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <div ref={containerRef} className={wrapperClass}>
      <div className={stickyChromeClass}>
        <div className="flex flex-wrap items-center gap-0.5 p-2">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo className="h-4 w-4" />
          </ToolbarButton>

          <Sep />

          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
            title="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
            title="Heading 3"
          >
            <Heading3 className="h-4 w-4" />
          </ToolbarButton>

          <Sep />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="Bold"
          >
            <Bold className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="Italic"
          >
            <Italic className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="Underline"
          >
            <UnderlineIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </ToolbarButton>

          <Sep />

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="Align Left"
          >
            <AlignLeft className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="Align Center"
          >
            <AlignCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="Align Right"
          >
            <AlignRight className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            active={editor.isActive({ textAlign: "justify" })}
            title="Justify"
          >
            <AlignJustify className="h-4 w-4" />
          </ToolbarButton>

          <Sep />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="Bullet List"
          >
            <List className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="Numbered List"
          >
            <ListOrdered className="h-4 w-4" />
          </ToolbarButton>

          <Sep />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="Blockquote"
          >
            <Quote className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            active={editor.isActive("codeBlock")}
            title="Code Block"
          >
            <Code className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={insertTable}
            active={inTable}
            title="Insert Table"
          >
            <TableIcon className="h-4 w-4" />
          </ToolbarButton>

          {inTable ? (
            <>
              <Sep />
              <ToolbarButton
                onClick={() => editor.chain().focus().addRowBefore().run()}
                title="Add row above"
              >
                <ArrowUpFromLine className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().addRowAfter().run()}
                title="Add row below"
              >
                <ArrowDownFromLine className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().deleteRow().run()}
                title="Delete row"
              >
                <Rows3 className="h-4 w-4 text-red-500" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().addColumnBefore().run()}
                title="Add column before"
              >
                <ArrowLeftFromLine className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().addColumnAfter().run()}
                title="Add column after"
              >
                <ArrowRightFromLine className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().deleteColumn().run()}
                title="Delete column"
              >
                <Columns3 className="h-4 w-4 text-red-500" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHeaderRow().run()}
                title="Toggle header row"
              >
                <Heading className="h-4 w-4" />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().deleteTable().run()}
                title="Delete table"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </ToolbarButton>
            </>
          ) : null}

          <Sep />

          <ToolbarButton
            onClick={() => {
              setShowLinkDialog((v) => !v);
              setShowImageDialog(false);
              setShowVideoDialog(false);
            }}
            active={editor.isActive("link") || showLinkDialog}
            title="Add Link"
          >
            <Link2 className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              setShowImageDialog((v) => !v);
              setShowLinkDialog(false);
              setShowVideoDialog(false);
            }}
            active={showImageDialog}
            title="Add Image"
          >
            <ImageIcon className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => {
              setShowVideoDialog((v) => !v);
              setShowLinkDialog(false);
              setShowImageDialog(false);
            }}
            active={editor.isActive("youtube") || showVideoDialog}
            title="Embed Video"
          >
            <YoutubeIcon className="h-4 w-4" />
          </ToolbarButton>

          <div className="flex-1" />

          <ToolbarButton
            onClick={() => setIsFullscreen((v) => !v)}
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Fullscreen"}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </ToolbarButton>
        </div>

        {showLinkDialog ? (
          <div className="flex flex-wrap items-center gap-2 border-t border-border bg-accent/5 px-3 py-3 sm:px-4">
            <Link2 className="h-4 w-4 shrink-0 text-accent" />
            <input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setLink();
                }
              }}
              className={panelInputClass}
              autoFocus
            />
            <button
              type="button"
              onClick={setLink}
              disabled={!linkUrl}
              className="rounded-md bg-accent px-3 py-2 text-sm text-accent-foreground disabled:opacity-50"
            >
              Set Link
            </button>
            {editor.isActive("link") ? (
              <button
                type="button"
                onClick={unsetLink}
                className="rounded-md border border-border px-3 py-2 text-sm text-red-600"
              >
                Remove
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => {
                setShowLinkDialog(false);
                setLinkUrl("");
              }}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        {showImageDialog ? (
          <div className="max-h-[50vh] space-y-3 overflow-y-auto border-t border-border bg-muted/40 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">Add Image</h4>
              <button
                type="button"
                onClick={() => {
                  setShowImageDialog(false);
                  setImageUrl("");
                }}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="url"
                placeholder="Paste image URL…"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    insertImageFromUrl();
                  }
                }}
                className={panelInputClass}
                autoFocus
              />
              <button
                type="button"
                onClick={insertImageFromUrl}
                disabled={!imageUrl}
                className="rounded-md bg-accent px-4 py-2 text-sm text-accent-foreground disabled:opacity-50"
              >
                Add
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploadingImage}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-background px-4 py-3 text-sm text-foreground hover:border-accent disabled:opacity-50"
            >
              {uploadingImage ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading…
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload from Device
                </>
              )}
            </button>
          </div>
        ) : null}

        {showVideoDialog ? (
          <div className="max-h-[50vh] space-y-3 overflow-y-auto border-t border-border bg-muted/40 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-foreground">
                Embed Video
              </h4>
              <button
                type="button"
                onClick={() => {
                  setShowVideoDialog(false);
                  setVideoUrl("");
                }}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Supports YouTube, Vimeo, or any embed URL.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=…"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    insertVideo();
                  }
                }}
                className={panelInputClass}
                autoFocus
              />
              <button
                type="button"
                onClick={insertVideo}
                disabled={!videoUrl}
                className="rounded-md bg-accent px-4 py-2 text-sm text-accent-foreground disabled:opacity-50"
              >
                Embed
              </button>
            </div>
          </div>
        ) : null}
      </div>

      <div className={editorAreaClass}>
        <EditorContent editor={editor} />
      </div>

      <div
        className={`flex items-center justify-between border-t border-border bg-muted/50 px-4 py-1.5 font-mono text-[11px] text-muted-foreground ${
          isFullscreen ? "shrink-0" : ""
        }`}
      >
        <span>
          {wordCount.toLocaleString()} {wordCount === 1 ? "word" : "words"}
        </span>
        <span>{readingTime} min read</span>
      </div>
    </div>
  );
}
