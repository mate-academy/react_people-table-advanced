import { Person } from '../types/Person/Person';
import { Sort } from '../types/Sort/Sort';
import { isIncludes } from './isIncludes';

export const preparationPeople = (
  people: Person[],
  searchParams: URLSearchParams,
): Person[] => {
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('century') || [];

  const sort = (searchParams.get('sort') as Sort) || '';
  const order = searchParams.get('order') ? -1 : 1;

  const filterPeople = people.filter(person => {
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
  });

  if (!sort) {
    return filterPeople;
  }

  return (
    filterPeople.sort((personFirst, personSecond) => {
      if (sort === 'name' || sort === 'sex') {
        return order * personFirst[sort].localeCompare(personSecond[sort]);
      }

      return order * (personFirst[sort] - personSecond[sort]);
    })
  );
};
