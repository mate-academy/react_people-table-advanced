import { Person } from '../types';
import { CENTURY } from './constants';
import { findPersonByName } from './findPersonByName';

export const getPreparedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const centuries = searchParams.getAll('century') || [];

  const peopleWithParents = people.map(person => {
    const mother = findPersonByName(person.motherName, people);

    const father = findPersonByName(person.fatherName, people);

    return { ...person, mother, father };
  });

  if (!sex && !query && !centuries.length) {
    return peopleWithParents;
  }

  return peopleWithParents.filter((person) => {
    const sexFilter = sex ? sex === person.sex : true;
    const queryFilter = !query || (
      person.name.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query)
    );

    const bornCentury = (Math.ceil(person.born / CENTURY)).toString();
    const centuryFilter = !centuries.length
      || centuries.includes(bornCentury);

    return sexFilter && queryFilter && centuryFilter;
  });
};
