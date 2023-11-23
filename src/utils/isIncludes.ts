export const isIncludes = (name: string | null, query: string): boolean => (
  name !== null && name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
);
