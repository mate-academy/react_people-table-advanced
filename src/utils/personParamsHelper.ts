export const getPersonPath = (name: string, born: number) =>
  `${name.toLowerCase().replaceAll(' ', '-')}-${born}`;

export const getCurrentPerson = (h: string) => {
  const arrData = h.split('-');

  const name = arrData.slice(0, arrData.length - 1).join(' ');
  const born = +arrData[arrData.length - 1];

  return { name, born };
};
