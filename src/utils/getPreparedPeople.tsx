import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query')?.trim().toLowerCase() || '';
  const centuries = searchParams.getAll('century') || [];

  const findPersonByName = (personName: string | null) => {
    return people.find(({ name }) => name === personName);
  };

  const peopleWithParents = people.map(person => {
    const mother = findPersonByName(person.motherName);

    const father = findPersonByName(person.fatherName);

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

    const bornCentury = (Math.ceil(person.born / 100)).toString();
    const centuryFilter = !centuries.length
      || centuries.includes(bornCentury);

    return sexFilter && queryFilter && centuryFilter;
  });
};
