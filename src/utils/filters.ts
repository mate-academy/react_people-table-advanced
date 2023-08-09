import { Person, SelectedSex, FilterParams } from '../types';

export const getVisiblePeople = (peopleData: Person[], {
  query,
  sex,
  centuries,
  sort,
  order,
}: FilterParams): Person[] => {
  let filteredPeople = [...peopleData];
  const normalQuery = query.toLowerCase().trim();

  if (query) {
    filteredPeople = filteredPeople.filter((person) => {
      return person.name.toLowerCase().includes(normalQuery)
        || person.motherName?.toLowerCase().includes(normalQuery)
        || person.fatherName?.toLowerCase().includes(normalQuery);
    });
  }

  if (sex) {
    switch (sex) {
      case SelectedSex.MALE:
        filteredPeople = filteredPeople.filter(person => person.sex === 'm');
        break;
      case SelectedSex.FEMALE:
        filteredPeople = filteredPeople.filter(person => person.sex === 'f');
        break;
      default:
        break;
    }
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter((person) => {
      const personBornCentury = Math.ceil(person.born / 100).toString();

      return centuries.includes(personBornCentury);
    });
  }

  if (sort) {
    filteredPeople = filteredPeople.sort((person1, person2) => {
      switch (sort) {
        case 'Name':
          return person1.name.localeCompare(person2.name);
        case 'Sex':
          return person1.sex.localeCompare(person2.sex);
        case 'Born':
          return person1.born - person2.born;
        case 'Died':
          return person1.died - person2.died;
        default:
          return 0;
      }
    });
  }

  if (order) {
    filteredPeople.reverse();
  }

  return filteredPeople;
};
