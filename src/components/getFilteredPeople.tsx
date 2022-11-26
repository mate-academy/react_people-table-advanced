import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
) => {
  let filteredPeople = [...people];
  const queryNormalized = query.toLowerCase();

  function centuryFromYear(year: number) {
    const century = Math.floor((year - 1) / 100) + 1;

    return century.toString();
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(
      person => person.sex === sex,
    );
  }

  if (query) {
    filteredPeople = filteredPeople.filter(
      person => (
        person.name.toLowerCase().includes(queryNormalized)
        || person.motherName?.toLowerCase().includes(queryNormalized)
        || person.fatherName?.toLowerCase().includes(queryNormalized)
      ),
    );
  }

  if (centuries.length !== 0) {
    filteredPeople = filteredPeople.filter(
      person => {
        const year = centuryFromYear(person.born);

        return centuries.includes(year);
      },
    );
  }

  return filteredPeople;
};
