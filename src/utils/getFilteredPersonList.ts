import { Person } from '../types';
import { getNameMatches } from './getNameMatches';

export function getFilteredPersonList(
  data: Person[],
  filterStatus: string,
  query: string,
  centuries: string[],
) {
  let resultData = [...data];

  if (filterStatus) {
    resultData = resultData.filter(person => person.sex === filterStatus);
  }

  if (!!query) {
    resultData = resultData.filter(person => {
      const { name, motherName, fatherName } = person;
      const lowerQuery = query.toLocaleLowerCase();
      const nameMatches = getNameMatches(name, lowerQuery);
      const motherNameMatches =
        motherName && getNameMatches(motherName, lowerQuery);
      const fatherNameMatches =
        fatherName && getNameMatches(fatherName, lowerQuery);

      return nameMatches || motherNameMatches || fatherNameMatches;
    });
  }

  if (centuries.length) {
    resultData = resultData.filter(person => {
      return centuries.includes(Math.ceil(person.born / 100).toString());
    });
  }

  return resultData;
}
