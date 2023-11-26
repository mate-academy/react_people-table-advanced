import { Person } from '../types';

type Props = {
  filtered: Person[],
  filter: string | null,
  query: string | null,
  centuries: string,
};

export const filterPeople = ({
  filtered, filter, query, centuries,
}: Props) => {
  let filteredPeople = filtered;

  if (filter) {
    filteredPeople = filteredPeople.filter(person => person.sex === filter);
  }

  if (query) {
    filteredPeople = filteredPeople.filter(person => (
      person.name.toLowerCase().includes(query)
      || person.motherName?.toLowerCase().includes(query)
      || person.fatherName?.toLowerCase().includes(query)
    ));
  }

  if (centuries.length > 0) {
    filteredPeople = filteredPeople.filter((person) => {
      const personCentury = Math.ceil(person.born / 100);

      return centuries.includes(personCentury.toString());
    });
  }

  return filteredPeople;
};
