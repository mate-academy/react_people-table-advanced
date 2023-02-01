export const getCenturies = (start: number, end: number): string[] => {
  const centuries = [];

  for (let i = start; i <= end; i += 1) {
    centuries.push(String(i));
  }

  return centuries;
};
