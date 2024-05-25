import { Person } from '../types';

export const filterPeople = (
  peopleFromServer: Person[],
  searchParams: URLSearchParams,
) => {
  let filteredPeoples = peopleFromServer;

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  if (sex) {
    filteredPeoples = filteredPeoples.filter(
      (person: Person) => person.sex === sex,
    );
  }

  if (centuries.length) {
    filteredPeoples = filteredPeoples.filter((person: Person) => {
      return centuries.includes(person.born.toString().slice(0, 2));
    });
  }

  if (query !== '') {
    filteredPeoples = filteredPeoples.filter((person: Person) => {
      return (
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.fatherName?.toLowerCase().includes(query.toLowerCase()) ||
        person.motherName?.toLowerCase().includes(query.toLowerCase())
      );
    });
  }

  return filteredPeoples;
};
