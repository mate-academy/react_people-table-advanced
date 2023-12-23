export const isFemale = (gender: string): boolean => {
  if (!gender) {
    return false;
  }

  return gender.toLowerCase() === 'f';
};
