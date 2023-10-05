import { Person } from '../types';

export function getPeopleFiltered(
  category: string,
  query: string,
  centuries: string[],
  people: Person[],
) {
  const preparedPeople = people.filter(({
    sex,
    name,
    born,
    motherName,
    fatherName,
  }) => {
    let filterCondition = true;

    if (category) {
      filterCondition = sex === category;
    }

    if (query) {
      const preparedQuery = query.toLowerCase();

      filterCondition = filterCondition
        && (name.toLowerCase().includes(preparedQuery)
          || (motherName?.toLowerCase().includes(preparedQuery) || false)
          || (fatherName?.toLowerCase().includes(preparedQuery) || false));
    }

    if (centuries.length) {
      filterCondition = filterCondition
        && centuries.includes(`${Math.ceil(born / 100)}`);
    }

    return filterCondition;
  });

  return preparedPeople;
}
