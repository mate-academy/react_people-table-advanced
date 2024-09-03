import { Person } from '../types';

type SortField = 'name' | 'sex' | 'born' | 'died';
type Order = 'asc' | 'desc';

type FuncParams = {
  people: Person[];
  query: string;
  sex: string;
  centuries: string[];
  sort: SortField | null;
  order: Order | null;
};

export const getFilteredPeople = ({
  people,
  query,
  sex,
  centuries,
  sort,
  order,
}: FuncParams): Person[] => {
  let visiblePeople = [...people];

  if (query) {
    visiblePeople = visiblePeople.filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(query.toLowerCase())) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(query.toLowerCase())),
    );
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    visiblePeople = visiblePeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    visiblePeople.sort((a, b) => {
      let result = 0;

      const firstVal = a[sort];
      const secondVal = b[sort];

      if (typeof firstVal === 'string' && typeof secondVal === 'string') {
        result = firstVal.localeCompare(secondVal);
      } else if (
        typeof firstVal === 'number' &&
        typeof secondVal === 'number'
      ) {
        result = firstVal - secondVal;
      }

      return order === 'desc' ? result * -1 : result;
    });
  }

  return visiblePeople;
};
