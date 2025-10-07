export function getCentury(year: number | string | null | undefined): string {
  const n = Number(year);

  if (!Number.isFinite(n) || n === 0) {
    return '0';
  }

  if (n < 0) {
    return '0';
  }

  return String(Math.ceil(n / 100));
}
