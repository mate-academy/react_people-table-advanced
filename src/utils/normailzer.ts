export const normalize = (value: string | null) => {
  return (value || '').toLowerCase();
};
