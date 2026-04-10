import { Person } from '../types/Person';

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_SEX = 'sex';
const SORT_FIELD_BORN = 'born';
const SORT_FIELD_DIED = 'died';

export const getSortedPeople = (
  people: Person[],
  sort?: string | null,
  order?: string | null,
) => {
  const sortedPeople = [...people];

  if (!sort) {
    return sortedPeople;
  }

  sortedPeople.sort((p1, p2) => {
    switch (sort) {
      case SORT_FIELD_NAME:
      case SORT_FIELD_SEX:
        return String(p1[sort]).localeCompare(String(p2[sort]));

      case SORT_FIELD_BORN:
      case SORT_FIELD_DIED:
        return Number(p1[sort]) - Number(p2[sort]);

      default:
        return 0;
    }
  });

  if (order === 'desc') {
    sortedPeople.reverse();
  }

  return sortedPeople;
};
