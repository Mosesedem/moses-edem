import type { ReactNode } from "react";
import Link from "next/link";
import { AdminSubmitButton } from "@/components/admin/submit-button";

export function AdminPageHeader({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {kicker}
        </p>
        <h1 className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
      {action ? (
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
          {action}
        </div>
      ) : null}
    </div>
  );
}

export function AdminFlash({
  saved,
  deleted,
  error,
  message,
}: {
  saved?: boolean;
  deleted?: boolean;
  error?: string | null;
  message?: string | null;
}) {
  if (error) {
    return (
      <p className="mt-3 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2.5 font-mono text-xs leading-relaxed text-red-600 dark:text-red-400">
        {error}
      </p>
    );
  }
  if (message) {
    return (
      <p className="mt-3 rounded-md border border-accent/40 bg-accent/10 px-3 py-2.5 font-mono text-xs leading-relaxed text-foreground">
        {message}
      </p>
    );
  }
  if (!saved && !deleted) return null;
  return (
    <p className="mt-3 font-mono text-xs text-accent">
      {deleted ? "Deleted." : "Saved. Public site will show the update."}
    </p>
  );
}

const fieldLabelClass =
  "text-[11px] font-mono uppercase tracking-wider text-muted-foreground";
const fieldInputClass =
  "mt-1.5 w-full min-h-11 rounded-lg border border-border bg-background px-3 py-2.5 text-base sm:text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

export function AdminField({
  name,
  label,
  defaultValue,
  required,
  type = "text",
  placeholder,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={fieldLabelClass}>
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? ""}
        placeholder={placeholder}
        className={fieldInputClass}
      />
      {hint ? (
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function AdminTextArea({
  name,
  label,
  defaultValue,
  rows = 4,
  required,
  hint,
  mono,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  rows?: number;
  required?: boolean;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className={fieldLabelClass}>
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={`${fieldInputClass} min-h-[6.5rem] resize-y ${
          mono ? "font-mono text-sm sm:text-xs" : ""
        }`}
      />
      {hint ? (
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function AdminSelect({
  name,
  label,
  defaultValue,
  options,
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className={fieldLabelClass}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={fieldInputClass}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {hint ? (
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function AdminCheckbox({
  name,
  label,
  defaultChecked,
  hint,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-3 active:bg-muted/40">
        <input
          type="checkbox"
          name={name}
          defaultChecked={defaultChecked}
          className="mt-0.5 h-4 w-4 shrink-0"
        />
        <span>
          <span className="block text-sm font-medium text-foreground">
            {label}
          </span>
          {hint ? (
            <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">
              {hint}
            </span>
          ) : null}
        </span>
      </label>
    </div>
  );
}

export function AdminSubmit({ children }: { children: ReactNode }) {
  return <AdminSubmitButton>{children}</AdminSubmitButton>;
}

export function AdminPrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-foreground sm:min-h-11 sm:w-auto sm:py-2.5"
    >
      {children}
    </Link>
  );
}

export function AdminBackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mb-5 inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-accent active:text-accent"
    >
      ← {label}
    </Link>
  );
}

export function AdminEmpty({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mt-8 rounded-lg border border-dashed border-border px-4 py-10 text-center sm:px-6 sm:py-12">
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {action ? (
        <div className="mt-5 flex justify-center">{action}</div>
      ) : null}
    </div>
  );
}

export function AdminRow({
  title,
  meta,
  actions,
}: {
  title: string;
  meta: string;
  actions: ReactNode;
}) {
  return (
    <li className="rounded-lg border border-border px-3.5 py-3.5 sm:px-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium leading-snug text-foreground">
            {title}
          </p>
          <p className="mt-1 break-all font-mono text-[11px] leading-relaxed text-muted-foreground">
            {meta}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-stretch gap-2 sm:items-center">
          {actions}
        </div>
      </div>
    </li>
  );
}

export function AdminEditLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-border px-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent active:bg-muted sm:min-h-9 sm:flex-none sm:px-2.5 sm:text-xs"
    >
      Edit
    </Link>
  );
}
