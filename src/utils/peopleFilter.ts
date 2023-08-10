import { Person } from '../types';

interface FilterParams {
  query: string,
  sex: string,
  centuries: string[],
  sortField: string,
  order: string,
}

export const getPreparedPeople = (
  people: Person[],
  {
    query,
    sex,
    centuries,
    sortField,
    order,
  }: FilterParams,
) => {
  let preparedPeople = [...people];

  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery) {
    preparedPeople = preparedPeople.filter(person => (
      person.name.toLowerCase().includes(normalizedQuery)
      || person.fatherName?.toLowerCase().includes(normalizedQuery)
      || person.motherName?.toLowerCase().includes(normalizedQuery)
    ));
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => {
      const personBornCentury = Math.ceil((person.born) / 100);

      return centuries.includes(personBornCentury.toString());
    });
  }

  if (sortField) {
    preparedPeople.sort((personA, personB) => {
      switch (sortField) {
        case 'name':
          return personA.name.localeCompare(personB.name);
        case 'sex':
          return personA.sex.localeCompare(personB.sex);
        case 'born':
          return personA.born - personB.born;
        case 'died':
          return personA.died - personB.died;
        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
