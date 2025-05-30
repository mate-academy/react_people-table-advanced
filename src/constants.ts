import { SearchParamsNames } from './types';

export const SORT_DESC = 'desc';

export const FILTERS = {
  sexFilter: [
    { name: 'All', value: null },
    { name: 'Male', value: 'm' },
    { name: 'Female', value: 'f' },
  ],

  centuriesFilter: [
    { name: '16', value: 16 },
    { name: '17', value: 17 },
    { name: '18', value: 18 },
    { name: '19', value: 19 },
    { name: '20', value: 20 },
    { name: 'All', value: null },
  ],

  resetAllParams: {
    [SearchParamsNames.Sex]: null,
    [SearchParamsNames.Query]: null,
    [SearchParamsNames.Centuries]: null,
  },
};
