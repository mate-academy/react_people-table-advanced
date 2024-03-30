import { Person } from '../types';
import { Search } from '../types/Search';
import { Field } from '../types/Field';

export const sortPeople = (
  people: Person[],
  sortField: Field,
  reversed: boolean,
  { sex, query, centuries }: Search,
) => {
  let sortedPeople = [...people];

  if (sex) {
    sortedPeople = sortedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    sortedPeople = sortedPeople.filter(
      person =>
        person.name.toLocaleLowerCase().includes(query) ||
        person.fatherName?.toLocaleLowerCase().includes(query) ||
        person.motherName?.toLocaleLowerCase().includes(query),
    );
  }

  if (centuries.length) {
    sortedPeople = sortedPeople.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sortField) {
    sortedPeople.sort((person1, person2) => {
      const { Name, Sex, Born, Died } = Field;

      switch (sortField) {
        case Name:
        case Sex:
          return person1[sortField].localeCompare(person2[sortField]);
        case Born:
        case Died:
          return person1[sortField] - person2[sortField];
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    sortedPeople = sortedPeople.reverse();
  }

  return sortedPeople;
};

export const handleSort = (
  currentSort: string,
  sort: string,
  order: string,
) => {
  if ((!sort && !order) || (sort && sort !== currentSort)) {
    return { sort: currentSort, order: null };
  }

  if (sort === currentSort && !order) {
    return { sort: currentSort, order: 'desc' };
  }

  return { sort: null, order: null };
};
