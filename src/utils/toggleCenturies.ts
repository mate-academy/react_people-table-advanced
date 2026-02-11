export function toggleCenturies(centuries: string[], century: string) {
  return centuries.includes(century)
    ? centuries.filter(ch => ch !== century)
    : [...centuries, century];
}
