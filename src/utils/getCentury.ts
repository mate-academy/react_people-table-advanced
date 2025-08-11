export function getCentury(year: number) {
  return Math.floor((year - 1) / 100) + 1;
}
