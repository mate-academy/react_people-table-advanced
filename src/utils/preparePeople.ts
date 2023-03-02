import { Person } from '../types';
import { SortType } from '../types/SortType';

export const preparePeople = (
  people: Person[],
  currentSex: string | null,
  searchQuery: string | null,
  currentCenturies: string[],
  sortType: SortType | null,
  sortOrder: string | null,
) => {
  let visiblePeople = people;

  if (currentSex) {
    visiblePeople = people.filter(person => {
      switch (currentSex) {
        case 'm':
          return person.sex === 'm';
        case 'f':
          return person.sex === 'f';
        default:
          return true;
      }
    });
  }

  if (searchQuery) {
    const preparedSearchQuery = searchQuery.toLowerCase().trim();

    visiblePeople = visiblePeople.filter(person => {
      return person.name.toLowerCase().includes(preparedSearchQuery)
        || person.motherName?.toLowerCase().includes(preparedSearchQuery)
        || person.fatherName?.toLowerCase().includes(preparedSearchQuery);
    });
  }

  if (currentCenturies.length) {
    visiblePeople = visiblePeople.filter(person => {
      const personBornCent = Math.ceil(person.born / 100).toString();

      return currentCenturies.includes(personBornCent);
    });
  }

  if (sortType) {
    const sortedPeople = [...visiblePeople];

    visiblePeople = sortedPeople.sort((a, b) => {
      switch (sortType) {
        case SortType.NAME:
        case SortType.SEX:
          return a[sortType].localeCompare(b[sortType]);
        case SortType.BORN:
        case SortType.DIED:
          return a[sortType] - b[sortType];
        default:
          return 0;
      }
    });

    if (sortOrder) {
      visiblePeople = sortedPeople.reverse();
    }
  }

  return visiblePeople;
};
