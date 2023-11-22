import { Person } from '../types';
import { isIncludes } from './isIncludes';

export const filterPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century') || [];

  return (
    people.filter(person => {
      const {
        name,
        motherName,
        fatherName,
        born,
      } = person;

      const sexFilter = sex !== ''
        ? person.sex === sex
        : true;

      const queryFilter = isIncludes(name, query)
        || isIncludes(motherName, query)
        || isIncludes(fatherName, query);

      if (!centuries.length) {
        return sexFilter && queryFilter;
      }

      const centuryFilter = centuries.includes(
        Math.floor(born / 100 + 1).toString(),
      );

      return sexFilter && queryFilter && centuryFilter;
    })
  );
};
