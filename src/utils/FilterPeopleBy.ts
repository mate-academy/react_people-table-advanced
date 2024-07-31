import { Person } from '../types';
import { SexEnum } from '../components/SexEnum';

export const filterPeopleBy = (
  people: Person[],
  centuries: string[],
  query: string | null,
  sex: SexEnum | null,
): Person[] => {
  let filteredPeople = [...people];

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const bornCentury = Math.floor(person.born / 100) + 1;
      const diedCentury = Math.floor(person.died / 100) + 1;

      return centuries.some(
        century =>
          parseInt(century) === bornCentury ||
          parseInt(century) === diedCentury,
      );
    });
  }

  if (query) {
    filteredPeople = filteredPeople.filter(
      person =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        (person.motherName &&
          person.motherName.toLowerCase().includes(query.toLowerCase())) ||
        (person.fatherName &&
          person.fatherName.toLowerCase().includes(query.toLowerCase())),
    );
  }

  if (sex === SexEnum.Male) {
    filteredPeople = filteredPeople.filter(p => p.sex === SexEnum.Male);
  }

  if (sex === SexEnum.Female) {
    filteredPeople = filteredPeople.filter(p => p.sex === SexEnum.Female);
  }

  return filteredPeople;
};
