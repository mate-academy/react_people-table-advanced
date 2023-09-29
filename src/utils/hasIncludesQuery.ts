export const hasIncludesQuery = (name: string | null, query: string) => {
  const validQuery = query.trim().toLowerCase();

  return !!name?.toLowerCase().includes(validQuery);
};
