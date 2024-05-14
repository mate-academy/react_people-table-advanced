export function includesIgnoreCase(
  text: string | null | undefined,
  query: string | null | undefined,
): boolean {
  if (!text || !query) {
    return false;
  }

  return text.toLowerCase().includes(query.toLowerCase());
}
