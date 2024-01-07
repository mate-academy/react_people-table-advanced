export const handleCenturies = (
  centuries: string [],
  century: string,
) => {
  return centuries.includes(century)
    ? centuries.filter(cent => cent !== century)
    : [century, ...centuries];
};
