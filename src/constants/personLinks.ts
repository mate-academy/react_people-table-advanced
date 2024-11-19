import { SORTER_TYPES } from './sortedTypes';

export const sexLinksParams = [
  { title: 'All', params: { sex: null } },
  { title: 'Male', params: { sex: 'm' } },
  { title: 'Female', params: { sex: 'f' } },
];

export const centuryLinksParams = [
  { title: '16', century: '16' },
  { title: '17', century: '17' },
  { title: '18', century: '18' },
  { title: '19', century: '19' },
  { title: '20', century: '20' },
];

export const sortLinksParams = [
  { title: 'Name', sortType: SORTER_TYPES.NAME },
  { title: 'Sex', sortType: SORTER_TYPES.SEX },
  { title: 'Born', sortType: SORTER_TYPES.BORN },
  { title: 'Died', sortType: SORTER_TYPES.DIED },
];
