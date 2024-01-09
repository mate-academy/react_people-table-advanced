export enum GenderSorting {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const genderHeader = {
  all: {
    key: GenderSorting.All,
    title: 'All',
  },
  male: {
    key: GenderSorting.Male,
    title: 'Male',
  },
  female: {
    key: GenderSorting.Female,
    title: 'Female',
  },
};
