/**
 * cms-store.ts — intentionally empty shim.
 *
 * The file-based CMS store has been removed. Postgres is the single source of
 * truth for all CMS content. This file exists only so any stale imports
 * compile without error during the transition.
 */

export type CmsSnapshot = Record<string, unknown>;
