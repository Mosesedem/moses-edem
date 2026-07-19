import DOMPurify from "isomorphic-dompurify";

type BlogContentProps = {
  body: string;
};

function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value.trim());
}

/** Legacy markdown-lite fallback for older plain-text posts. */
function renderLegacyMarkdown(body: string) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);

  return (
    <div className="blog-content space-y-5">
      {paragraphs.map((para, i) => {
        if (/^#{1,3}\s/.test(para.trim())) {
          const text = para.replace(/^#{1,3}\s+/, "");
          return (
            <h2
              key={i}
              className="pt-2 text-lg font-medium tracking-tight text-foreground sm:text-xl"
            >
              {text}
            </h2>
          );
        }
        if (/^\d+\.\s/.test(para.trim()) || para.includes("\n")) {
          const lines = para.split("\n");
          return (
            <div key={i} className="space-y-2">
              {lines.map((line, j) => (
                <p
                  key={j}
                  className="text-[0.975rem] leading-[1.75] text-muted-foreground sm:text-base"
                >
                  {renderInline(line)}
                </p>
              ))}
            </div>
          );
        }
        return (
          <p
            key={i}
            className="text-[0.975rem] leading-[1.75] text-muted-foreground sm:text-base"
          >
            {renderInline(para)}
          </p>
        );
      })}
    </div>
  );
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-xs text-foreground"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

/**
 * Renders blog body: sanitized HTML from the rich editor, or legacy plain text.
 */
export function BlogContent({ body }: BlogContentProps) {
  if (!body?.trim()) {
    return (
      <p className="text-sm text-muted-foreground">This post has no content.</p>
    );
  }

  if (!looksLikeHtml(body)) {
    return renderLegacyMarkdown(body);
  }

  const clean = DOMPurify.sanitize(body, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ["iframe"],
    ADD_ATTR: [
      "allow",
      "allowfullscreen",
      "frameborder",
      "scrolling",
      "src",
      "target",
      "rel",
      "class",
      "style",
      "width",
      "height",
    ],
  });

  return (
    <div
      className="blog-content"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
