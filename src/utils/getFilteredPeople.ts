import { Person } from '../types';

type FilterParams = {
  sex: string | null;
  query: string | null;
  centuries: string[];
  sort: string | null;
  order: string | null;
};

export function getFilteredPeople(
  allPeople: Person[],
  { sex, query, centuries, sort, order }: FilterParams,
): Person[] {
  let filteredPeople = [...allPeople];

  if (query) {
    filteredPeople = filteredPeople.filter(
      ({ name, motherName, fatherName }) => {
        const lowQuery = query.toLowerCase();

        const hasNameQuery = name.toLowerCase().includes(lowQuery);

        const hasMotherNameQuery =
          !!motherName && motherName.toLowerCase().includes(lowQuery);

        const hasFatherNameQuery =
          !!fatherName && fatherName.toLowerCase().includes(lowQuery);

        return hasNameQuery || hasMotherNameQuery || hasFatherNameQuery;
      },
    );
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(({ born }) =>
      centuries.includes(`${Math.ceil(born / 100)}`),
    );
  }

  if (sex === 'm') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'm');
  }

  if (sex === 'f') {
    filteredPeople = filteredPeople.filter(person => person.sex === 'f');
  }

  if (sort) {
    if (sort === 'name' || sort === 'sex') {
      filteredPeople.sort((person1, person2) => {
        return person1[sort].localeCompare(person2[sort]);
      });
    } else if (sort === 'born' || sort === 'died') {
      filteredPeople.sort((person1, person2) => {
        return person1[sort] - person2[sort];
      });
    }
  }

  if (order) {
    filteredPeople = filteredPeople.reverse();
  }

  return filteredPeople;
}
