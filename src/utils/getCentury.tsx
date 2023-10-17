export function getCentury(year: number) {
  return String(year % 100 === 0
    ? Math.trunc(year / 100)
    : Math.trunc(year / 100) + 1);
}
