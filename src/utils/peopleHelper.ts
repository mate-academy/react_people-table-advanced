import { Person } from '../types';
import { SearchParamKey } from '../types/searchParams';
import { normalizeString, normalizeStrings } from './helpers';

export const getFilteredPeople = (
  people: Person[],
  searchParams: URLSearchParams,
) => {
  const filter = {
    name: normalizeString(searchParams.get(SearchParamKey.Name) ?? ''),
    sex: searchParams.get(SearchParamKey.Sex),
    category: searchParams.getAll(SearchParamKey.Centuries),
  };

  const hasName = ({ name, fatherName, motherName }: Person) =>
    normalizeStrings([name, fatherName ?? '-', motherName ?? '-']).some(n =>
      n.includes(filter.name),
    );
  const isSex = (person: Person) => !filter.sex || person.sex === filter.sex;
  const isFromCentury = (person: Person) =>
    !filter.category.length ||
    filter.category.includes(Math.ceil(person.born / 100).toString());

  const filteredPeople = people.filter(
    person => hasName(person) && isSex(person) && isFromCentury(person),
  );

  return filteredPeople;
};
