/**
 * Lightweight HTML sanitizer for trusted-editor + CMS content.
 * Pure JS — no jsdom/DOMPurify — safe on Vercel/serverless Node.
 *
 * Strips scripts, event handlers, and dangerous URLs while keeping
 * the TipTap / rich-text tags we actually emit.
 */

const ALLOWED_TAGS = new Set([
  "a",
  "abbr",
  "b",
  "blockquote",
  "br",
  "caption",
  "code",
  "col",
  "colgroup",
  "div",
  "em",
  "figcaption",
  "figure",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "iframe",
  "img",
  "li",
  "mark",
  "ol",
  "p",
  "pre",
  "s",
  "span",
  "strong",
  "sub",
  "sup",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);

/** Tags removed entirely (including children). */
const VOID_CONTENT_TAGS = new Set([
  "script",
  "style",
  "noscript",
  "template",
  "object",
  "embed",
  "link",
  "meta",
  "base",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "option",
]);

const GLOBAL_ATTRS = new Set(["class", "id", "title", "dir", "lang"]);

const TAG_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel", "name"]),
  img: new Set(["src", "alt", "width", "height", "loading", "decoding"]),
  iframe: new Set([
    "src",
    "width",
    "height",
    "allow",
    "allowfullscreen",
    "frameborder",
    "scrolling",
    "title",
    "referrerpolicy",
  ]),
  td: new Set(["colspan", "rowspan", "align"]),
  th: new Set(["colspan", "rowspan", "align", "scope"]),
  col: new Set(["span", "width"]),
  colgroup: new Set(["span"]),
  ol: new Set(["start", "type"]),
  li: new Set(["value"]),
  pre: new Set([]),
  code: new Set([]),
  span: new Set(["style"]),
  p: new Set(["style"]),
  h1: new Set(["style"]),
  h2: new Set(["style"]),
  h3: new Set(["style"]),
  div: new Set(["style"]),
  table: new Set(["style"]),
};

const SAFE_STYLE_PROPS = new Set([
  "text-align",
  "color",
  "background-color",
  "font-weight",
  "font-style",
  "text-decoration",
]);

const YOUTUBE_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
  "youtu.be",
]);

function decodeAttrEntities(value: string): string {
  return value
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) =>
      String.fromCharCode(parseInt(h, 16))
    );
}

function isSafeUrl(raw: string, kind: "href" | "src"): boolean {
  const value = decodeAttrEntities(raw).trim();
  if (!value) return false;

  // Block obvious script vectors
  const lower = value.toLowerCase().replace(/[\u0000-\u001f\s]+/g, "");
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("data:text/html")
  ) {
    return false;
  }

  if (kind === "href") {
    if (
      value.startsWith("/") ||
      value.startsWith("#") ||
      value.startsWith("?") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:") ||
      value.startsWith("https://") ||
      value.startsWith("http://")
    ) {
      return true;
    }
    // relative paths without scheme
    if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(value)) return true;
    return false;
  }

  // src
  if (value.startsWith("data:image/")) return true;
  if (value.startsWith("/") || value.startsWith("https://") || value.startsWith("http://")) {
    return true;
  }
  return false;
}

function isSafeIframeSrc(raw: string): boolean {
  if (!isSafeUrl(raw, "src")) return false;
  try {
    const url = new URL(decodeAttrEntities(raw).trim(), "https://example.com");
    if (url.protocol !== "https:" && url.protocol !== "http:") return false;
    // Allow same-origin relative already handled above via isSafeUrl
    if (raw.startsWith("/")) return false; // no local iframes
    return YOUTUBE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

function sanitizeStyle(value: string): string | null {
  const parts = value.split(";").map((p) => p.trim()).filter(Boolean);
  const kept: string[] = [];
  for (const part of parts) {
    const idx = part.indexOf(":");
    if (idx === -1) continue;
    const prop = part.slice(0, idx).trim().toLowerCase();
    const val = part.slice(idx + 1).trim();
    if (!SAFE_STYLE_PROPS.has(prop)) continue;
    if (/expression|url\s*\(|@import|javascript:/i.test(val)) continue;
    kept.push(`${prop}: ${val}`);
  }
  return kept.length ? kept.join("; ") : null;
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type Attr = { name: string; value: string };

function parseAttrs(raw: string): Attr[] {
  const attrs: Attr[] = [];
  const re =
    /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    const name = m[1];
    if (!name || name === "/") continue;
    const value = m[2] ?? m[3] ?? m[4] ?? "";
    attrs.push({ name, value });
  }
  return attrs;
}

function filterAttrs(tag: string, attrs: Attr[]): Attr[] {
  const allowed = new Set<string>(
    Array.from(GLOBAL_ATTRS).concat(Array.from(TAG_ATTRS[tag] ?? []))
  );
  const out: Attr[] = [];

  for (const { name, value } of attrs) {
    const lower = name.toLowerCase();
    if (lower.startsWith("on")) continue;
    if (lower === "style") {
      const safe = sanitizeStyle(value);
      if (safe) out.push({ name: "style", value: safe });
      continue;
    }
    if (!allowed.has(lower)) continue;

    if (lower === "href") {
      if (!isSafeUrl(value, "href")) continue;
      out.push({ name: "href", value });
      continue;
    }
    if (lower === "src") {
      if (tag === "iframe") {
        if (!isSafeIframeSrc(value)) continue;
      } else if (!isSafeUrl(value, "src")) {
        continue;
      }
      out.push({ name: "src", value });
      continue;
    }
    if (lower === "target") {
      const t = value.trim().toLowerCase();
      if (t === "_blank" || t === "_self") {
        out.push({ name: "target", value: t });
      }
      continue;
    }
    if (lower === "rel") {
      // Force safe rel when present
      out.push({ name: "rel", value: "noopener noreferrer" });
      continue;
    }
    if (lower === "allowfullscreen") {
      out.push({ name: "allowfullscreen", value: "" });
      continue;
    }

    out.push({ name: lower, value });
  }

  // External links: ensure rel when target=_blank
  const hasTargetBlank = out.some(
    (a) => a.name === "target" && a.value === "_blank"
  );
  if (tag === "a" && hasTargetBlank && !out.some((a) => a.name === "rel")) {
    out.push({ name: "rel", value: "noopener noreferrer" });
  }

  return out;
}

function serializeOpenTag(tag: string, attrs: Attr[], selfClosing: boolean): string {
  let html = `<${tag}`;
  for (const { name, value } of attrs) {
    if (value === "" && (name === "allowfullscreen" || name === "checked")) {
      html += ` ${name}`;
    } else {
      html += ` ${name}="${escapeAttr(value)}"`;
    }
  }
  if (selfClosing) html += " />";
  else html += ">";
  return html;
}

const SELF_CLOSING = new Set(["br", "hr", "img", "col"]);

/**
 * Sanitize HTML for safe use with dangerouslySetInnerHTML.
 */
export function sanitizeHtml(dirty: string): string {
  if (!dirty) return "";

  // Remove void-content tags and their contents first
  let html = dirty;
  Array.from(VOID_CONTENT_TAGS).forEach((tag) => {
    const re = new RegExp(
      `<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>|<${tag}\\b[^>]*\\/?>`,
      "gi"
    );
    html = html.replace(re, "");
  });

  // HTML comments
  html = html.replace(/<!--[\s\S]*?-->/g, "");

  // CDATA
  html = html.replace(/<!\[CDATA\[[\s\S]*?\]\]>/gi, "");

  const tokenRe = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>|([^<]+)/g;
  let out = "";
  let m: RegExpExecArray | null;

  while ((m = tokenRe.exec(html)) !== null) {
    if (m[3] != null) {
      // text node — keep as-is (already HTML-escaped from editor, or plain)
      out += m[3];
      continue;
    }

    const tagName = m[1].toLowerCase();
    const full = m[0];
    const isClose = full.startsWith("</");
    const attrRaw = m[2] ?? "";
    const selfClosing =
      SELF_CLOSING.has(tagName) || /\/\s*>$/.test(full);

    if (!ALLOWED_TAGS.has(tagName)) {
      // drop unknown tags, keep children (already sequential)
      continue;
    }

    if (isClose) {
      if (!SELF_CLOSING.has(tagName)) out += `</${tagName}>`;
      continue;
    }

    const attrs = filterAttrs(tagName, parseAttrs(attrRaw));

    // Drop iframes without a safe src
    if (tagName === "iframe" && !attrs.some((a) => a.name === "src")) {
      continue;
    }
    // Drop images without src
    if (tagName === "img" && !attrs.some((a) => a.name === "src")) {
      continue;
    }

    out += serializeOpenTag(tagName, attrs, selfClosing && SELF_CLOSING.has(tagName));
  }

  return out;
}
