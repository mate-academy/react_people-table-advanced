export const convertToSlug = (name: string, born: number): string | null => {
  if (!name) {
    return null;
  }

  const slugName = name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-');

  return `${slugName}-${born}`;
};
