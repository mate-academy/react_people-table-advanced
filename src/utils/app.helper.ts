export function isStringIncludesQuery(
  str: string | null,
  query: string,
): boolean | null {
  return str ? str.toLowerCase().includes(query) : false;
}
