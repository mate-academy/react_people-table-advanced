export const toggleLetter = <T>(array: T[], ch: T): T[] =>
  array.includes(ch) ? array.filter(i => i !== ch) : [...array, ch];
