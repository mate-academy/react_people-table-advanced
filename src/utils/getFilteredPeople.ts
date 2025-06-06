import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  query: string | null,
  centuries: string[],
  sex: string | null,
) => {
  let filteredPeople = [...people];

  if (query?.length) {
    filteredPeople = filteredPeople.filter((currentPerson: Person) => {
      // Does their name match the query
      return (
        currentPerson.name.toLowerCase().includes(query.toLowerCase()) ||
        currentPerson.motherName?.toLowerCase().includes(query.toLowerCase()) ||
        currentPerson.fatherName?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  if (centuries.length > 0 && centuries.length < 5) {
    filteredPeople = filteredPeople.filter((currentPerson: Person) => {
      const centuryBorn = Math.ceil(currentPerson.born / 100).toString();

      return centuries.includes(centuryBorn);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(
      (person: Person) => person.sex === sex,
    );
  }

  return filteredPeople;
};
