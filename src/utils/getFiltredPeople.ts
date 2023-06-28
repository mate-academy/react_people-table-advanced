import { Person } from '../types/Person';

export const getFiltredPeople = (
  people: Person[],
  // searchParams: URLSearchParams,
  sex: string,
  query: string,
  centuries: string[],
) => {
  // const query = searchParams.get('query') || '';
  // const sex = searchParams.get('sex') || '';
  // const centuries = searchParams.getAll('centuries');
  let filtredPeople = [...people];

  if (sex) {
    filtredPeople = filtredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filtredPeople = filtredPeople.filter(person => {
      const personCentury = `${Math.ceil(person.born / 100)}`;

      return centuries.includes(personCentury);
    });
  }

  if (query) {
    filtredPeople = filtredPeople.filter(person => (
      person.name.toLowerCase().includes(query)
      || person.motherName?.toLocaleLowerCase().includes(query)
      || person.fatherName?.toLocaleLowerCase().includes(query)
    ));
  }

  return filtredPeople;
};
