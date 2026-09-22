/**
 * Utility functions for normalizing, cleaning, and parsing user word inputs.
 */

/**
 * Normalizes an individual word:
 * - Trims whitespace
 * - Converts to lower case
 * - Strips leading/trailing punctuation and quotes
 */
export function normalizeWord(raw: string): string {
  if (!raw) return '';
  return raw
    .trim()
    .toLowerCase()
    .replace(/^["'`([{«—]+/, '')
    .replace(/["'`)\]}».,;:!?—]+$/, '')
    .trim();
}

/**
 * Parses user text input that may contain multiple words across newlines and/or commas.
 * Deduplicates inputs while preserving original order.
 */
export function parseMultiWordInput(input: string): string[] {
  if (!input) return [];

  // Split by newlines, carriage returns, semicolons, and commas
  const rawTokens = input.split(/[\r\n,;]+/);
  const seen = new Set<string>();
  const results: string[] = [];

  for (const token of rawTokens) {
    const cleaned = normalizeWord(token);
    // Ignore empty tokens or numbers
    if (cleaned.length > 0 && !seen.has(cleaned) && !/^\d+$/.test(cleaned)) {
      seen.add(cleaned);
      results.push(cleaned);
    }
  }

  return results;
}

/**
 * Capitalizes first letter of a word/sentence for clean UI presentation.
 */
export function capitalize(str?: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
