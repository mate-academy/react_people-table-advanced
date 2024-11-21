import { sorterTypes } from './sortedTypes';

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
  { title: 'Name', sortType: sorterTypes.NAME },
  { title: 'Sex', sortType: sorterTypes.SEX },
  { title: 'Born', sortType: sorterTypes.BORN },
  { title: 'Died', sortType: sorterTypes.DIED },
];
