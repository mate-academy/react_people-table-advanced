export const isToggleCentury = (centuries: string[], century: string) => {
  if (centuries.includes(century)) {
    return centuries.filter(currentCentury => currentCentury !== century);
  }

  return [...centuries, century];
};
