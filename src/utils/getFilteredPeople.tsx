import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  let filteredPeople = [...people];

  const searchParamsObj: {
    query?: string;
    sex?: string;
    centuries?: string[];
  } = {
    query: searchParams.get('query'),
    sex: searchParams.get('sex'),
    centuries: searchParams.getAll('centuries'),
  };

  Object.entries(searchParamsObj).forEach(([key, value]) => {
    if (value) {
      switch (key) {
        case 'query':
          filteredPeople = filteredPeople.filter(
            person =>
              person.name.toLowerCase().includes(value.toLowerCase()) ||
              person.fatherName?.toLowerCase().includes(value.toLowerCase()) ||
              person.motherName?.toLowerCase().includes(value.toLowerCase()),
          );

          break;

        case 'sex':
          if (value === 'all') {
            break;
          }

          filteredPeople = filteredPeople.filter(
            person => person.sex === value,
          );
          break;

        case 'centuries':
          if (!value.length) {
            break;
          }

          if (Array.isArray(value)) {
            const centuriesAsNumbers = value.map(
              (centurie: string) => +centurie,
            );

            filteredPeople = filteredPeople.filter(person =>
              centuriesAsNumbers.includes(Math.ceil(person.born / 100)),
            );
          }

          break;

        default:
          break;
      }
    }
  });

  return filteredPeople;
};
