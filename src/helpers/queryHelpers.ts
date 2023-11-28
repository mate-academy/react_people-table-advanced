export const isQuery = (value: string | null, query: string) => {
  return value?.toLowerCase().includes(query.trim());
};
