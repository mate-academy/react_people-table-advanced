import { Person } from '../types';

export const getPreparedPeople = (
  people: Person[],
  {
    sex,
    centuries,
    query,
    sortField,
    isReversed,
  }: {
    sex: string | null;
    centuries: string[];
    query: string | null;
    sortField: string | null;
    isReversed?: boolean;
  },
) => {
  let preparedPeople = [...people];

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    preparedPeople = preparedPeople.filter(person =>
      centuries.includes(getCentury(person).toString()),
    );
  }

  if (query) {
    const normalizedQuery = query.toLocaleLowerCase();

    preparedPeople = preparedPeople.filter(person => {
      return [person.name, person.motherName || '', person.fatherName || '']
        .join('')
        .toLocaleLowerCase()
        .includes(normalizedQuery);
    });
  }

  if (sortField) {
    preparedPeople.sort((a, b) => {
      switch (sortField) {
        case 'name':
        case 'sex':
          return a[sortField].localeCompare(b[sortField]);

        case 'born':
        case 'died':
          return a[sortField] - b[sortField];

        default:
          return 0;
      }
    });

    if (isReversed) {
      preparedPeople.reverse();
    }
  }

  return preparedPeople;
};
