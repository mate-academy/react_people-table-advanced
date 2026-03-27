export const getPersonSlug = (name: string, born: number | null) => {
  return `${name} ${born ?? ''}`
    .trim()
    .replace(/\s+/g, '-')
    .replace(/,/g, '-')
    .toLowerCase();
};
