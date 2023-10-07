import { Person } from '../types';
import { ONE_HUNDRED } from './constants';

export const preparedPeople = (
  searchParams: URLSearchParams,
  people: Person[],
) => {
  const query = searchParams.get('query') || null;
  const centuries = searchParams.getAll('centuries') || null;
  const sex = searchParams.get('sex') || null;

  let copyPeople = [...people];
  const lowerQuery = query?.toLowerCase();

  if (lowerQuery) {
    copyPeople = copyPeople.filter(person => {
      return person.name.toLowerCase()
        .includes(lowerQuery)
        || person.motherName?.toLowerCase()
          .includes(lowerQuery)
        || person.fatherName?.toLowerCase()
          .includes(lowerQuery);
    });
  }

  if (centuries.length) {
    copyPeople = copyPeople.filter(person => {
      return centuries
        .includes(Math.ceil(person.born / ONE_HUNDRED).toString());
    });
  }

  if (sex) {
    copyPeople = copyPeople.filter(person => {
      return person.sex === sex;
    });
  }

  return copyPeople;
};
