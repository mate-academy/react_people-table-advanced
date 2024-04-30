export const capitalizeFirstLetter = (word: string) => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const getCentury = (born: number) => {
  return `${Math.trunc(born / 100 + 1)}`;
};
