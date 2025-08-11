export const getPersonCentury = (born: number) => {
  return Math.ceil(born / 100);
};
