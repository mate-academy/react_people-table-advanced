import { Person } from '../../types/Person';

const MALE = 'm';
const FEMALE = 'f';

export const filterPeople = (
  query: string,
  centuries: string[],
  sex: string,
  preparedPeopleList: Person[],
) => {
  let filteredPeople = [...preparedPeopleList];

  if (query) {
    filteredPeople = filteredPeople.filter(person =>
      person.name.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(person => {
      return centuries.includes(`${Math.ceil(person.born / 100)}`);
    });
  }

  if (sex) {
    switch (sex) {
      case MALE:
        return filteredPeople.filter(person => person.sex === 'm');
      case FEMALE:
        return filteredPeople.filter(person => person.sex === 'f');
      default:
        return filteredPeople;
    }
  }

  return filteredPeople;
};
