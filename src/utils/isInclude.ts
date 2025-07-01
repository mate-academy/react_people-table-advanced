export const isInclude = (entity: string | null, part: string) => {
  const normalizeEntityt = entity?.toLowerCase().trim();
  const normalizePart = part.toLowerCase().trim();

  return normalizeEntityt?.toLowerCase().includes(normalizePart);
};
