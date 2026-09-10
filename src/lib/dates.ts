/**
 * Content modification dates for the sitemap.
 *
 * The date a page's content last changed is the date of the last git commit
 * that touched its source file. That is a real modification date, not the
 * build time. When git history is unavailable (a shallow clone, a tarball
 * build) the fallback is the latest date recorded in the page's own
 * frontmatter, and when there is none the page carries no lastmod at all.
 */
import { execSync } from 'node:child_process';

const cache = new Map<string, string | undefined>();

/** ISO date (YYYY-MM-DD) of the last commit touching any of `paths`, or undefined. */
export function gitLastModified(paths: string[]): string | undefined {
  const key = paths.join('|');
  if (cache.has(key)) return cache.get(key);
  let result: string | undefined;
  try {
    const scope = paths.length ? ` -- ${paths.map((p) => JSON.stringify(p)).join(' ')}` : '';
    const out = execSync(`git log -1 --format=%cs${scope}`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) result = out;
  } catch {
    result = undefined;
  }
  cache.set(key, result);
  return result;
}

/** ISO date of the repository's last commit, as a last resort for static pages. Never the build time. */
export function repoLastCommitDate(): string | undefined {
  return gitLastModified([]);
}

/** Latest of the given dates as YYYY-MM-DD, or undefined when none are set. */
export function latestDate(...dates: (Date | undefined)[]): string | undefined {
  const iso = dates.filter((d): d is Date => Boolean(d)).map((d) => d.toISOString().slice(0, 10));
  return iso.sort().pop();
}

/**
 * lastmod for a page: git commit date of its source files, else the latest
 * frontmatter date, else undefined.
 */
export function lastModified(sourcePaths: string[], ...frontmatterDates: (Date | undefined)[]): string | undefined {
  return gitLastModified(sourcePaths) ?? latestDate(...frontmatterDates);
}
