export const sexFilterOptions = [
  { title: 'All', symbol: null },
  { title: 'Male', symbol: 'm' },
  { title: 'Female', symbol: 'f' },
] as const;

export const centuryFilterOptions = [16, 17, 18, 19, 20] as const;

export const sortOptions = ['name', 'sex', 'born', 'died'] as const;
