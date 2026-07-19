type CodePaneProps = {
  filename?: string;
  code: string;
};

export function CodePane({ filename = "stack.ts", code }: CodePaneProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          {filename}
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-foreground sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
