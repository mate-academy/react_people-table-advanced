import { FiltersType } from '../types/FiltersType';
import { Person } from '../types';

export const filterAndSorting = (
  filters: FiltersType,
  filterPeople: () => Person[],
  setFilteredPeople: React.Dispatch<React.SetStateAction<Person[]>>,
) => {
  if (!filters.isReversed) {
    const reversedFilteredPeople = filterPeople().sort((person1, person2) => {
      switch (filters.sortField) {
        case 'born':
          return person1.born - person2.born;
        case 'died':
          return person1.died - person2.died;
        case 'sex':
          return person1.sex.localeCompare(person2.sex);
        case 'name':
          return person1.name.localeCompare(person2.name);
        default:
          return 0;
      }
    });

    setFilteredPeople(reversedFilteredPeople);
  } else {
    setFilteredPeople(filterPeople());
  }
};
