export const getSexType = (filterType: string, sex: string) => {
  switch (filterType) {
    case 'All':
      return sex === '';
    case 'Male':
      return sex === 'm';
    case 'Female':
      return sex === 'f';
    default:
      return '';
  }
};
