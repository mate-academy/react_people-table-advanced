export const isInclude = (entityt: string | null, part: string) => {
  const normalizeEntityt = entityt?.toLowerCase().trim();
  const normalizePart = part.toLowerCase().trim();

  return normalizeEntityt?.toLowerCase().includes(normalizePart);
};
