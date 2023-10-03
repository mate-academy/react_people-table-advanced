import { useSearchParams } from 'react-router-dom';
import { SearchOptionsType, SortListType } from '../types/SearchTypes';
import { Person } from '../types';

export const usePeopleToRender = (people: Person[]) => {
  const [searchParams] = useSearchParams();
  const sex = searchParams.get(SearchOptionsType.Sex) || '';
  const query = searchParams.get(SearchOptionsType.Query) || '';
  const centuries: string[] = searchParams.getAll(
    SearchOptionsType.Centuries,
  ) || [];
  const sort = searchParams.get(SearchOptionsType.Sort) || '';
  const orderParam = searchParams.get(SearchOptionsType.Order) || '';
  const orderNumber = orderParam ? (-1) : 1;

  const filteredPeople = people.filter(person => {
    let isVisible: boolean | undefined = true;

    if (query) {
      const normalizedQuery = query.toLowerCase();

      const isQueryIncluded
        = person.name.toLowerCase().includes(normalizedQuery)
        || person.motherName?.toLowerCase().includes(normalizedQuery)
        || person.fatherName?.toLowerCase().includes(normalizedQuery);

      isVisible = isVisible && isQueryIncluded;
    }

    if (sex) {
      isVisible = isVisible && person.sex === sex;
    }

    if (centuries.length) {
      const isCenturyIncluded = centuries.includes(`${Math.ceil(person.born / 100)}`);

      isVisible = isVisible && isCenturyIncluded;
    }

    return isVisible;
  });

  if (sort) {
    filteredPeople.sort((personA, personB) => {
      switch (sort) {
        case SortListType.Name:
          return (personA.name.localeCompare(personB.name) * orderNumber);
        case SortListType.Sex:
          return (personA.sex.localeCompare(personB.sex) * orderNumber);
        case SortListType.Born:
          return (personA.born - personB.born) * orderNumber;
        case SortListType.Died:
          return (personA.died - personB.died) * orderNumber;
        default:
          return 0;
      }
    });
  }

  return filteredPeople;
};
