export const getSexParam = (filterType: string) => {
  let newParam = {};

  if (filterType === 'All') {
    newParam = { sex: null };
  }

  if (filterType === 'Male') {
    newParam = { sex: 'm' };
  }

  if (filterType === 'Female') {
    newParam = { sex: 'f' };
  }

  return newParam;
};
