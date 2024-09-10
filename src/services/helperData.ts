const helperData = {
  tabelHead: ['name', 'sex', 'born', 'died'],
  sexFilter: ['all', 'male', 'femail'],
  centuryFilter: [16, 17, 18, 19, 20],
};

export const { tabelHead, sexFilter, centuryFilter } = helperData;

export const setNameLink = (name: string) => {
  const firstChar = name[0].toUpperCase();

  return firstChar + name.slice(1);
};
