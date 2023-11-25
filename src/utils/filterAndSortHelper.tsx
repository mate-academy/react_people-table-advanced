import { Person } from '../types';
import { SearchParams, TableSortColumns } from '../types/SearchParams';
import { getCentury } from './helpers';

export function applyFilterAndSort(
  people: Person[],
  searchParams: URLSearchParams,
) {
  let filteredPeople: Person[] = [...people];
  const query = searchParams.get(SearchParams.Query)?.trim().toLowerCase();
  const centuries = searchParams.getAll(SearchParams.Centuries);
  const sex = searchParams.get(SearchParams.Sex);
  const sort = searchParams.get(SearchParams.Sort);
  const order = searchParams.get(SearchParams.Order) ? -1 : 1;

  if (!searchParams.toString()) {
    return people;
  }

  filteredPeople = filteredPeople.sort((personA, personB) => {
    switch (sort) {
      case TableSortColumns.Name:
      case TableSortColumns.Sex:
        return personA[sort].localeCompare(personB[sort]) * order;
      case TableSortColumns.Born:
      case TableSortColumns.Died:
        return (personA[sort] - personB[sort]) * order;

      default:
        return 0;
    }
  });

  if (query) {
    filteredPeople = filteredPeople.filter(person => {
      return person.name.toLowerCase().includes(query)
        || person.motherName?.toLowerCase().includes(query)
        || person.fatherName?.toLowerCase().includes(query);
    });
  }

  if (sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === sex);
  }

  if (centuries.length) {
    filteredPeople = filteredPeople.filter(
      person => centuries.some(
        century => +century === getCentury(person.born),
      ),
    );
  }

  return filteredPeople;
}
