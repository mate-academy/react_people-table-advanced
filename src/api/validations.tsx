export const isValidName = (name: string) => {
  const regEx = /^[a-zA-Z\s]*$/;

  return regEx.test(name);
};

export const isValidYears = (year: number) => (year >= 1400) && (year <= 2021);

export const isValidPersonYear = (year: number) => year >= 0 && year < 150;
