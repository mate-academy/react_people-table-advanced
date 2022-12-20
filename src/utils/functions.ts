export const isIncludesQuery = (value: string | null, query: string) => {
  return value ? value.toLowerCase().includes(query.toLowerCase()) : false;
};
