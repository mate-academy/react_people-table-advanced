import { Person } from '../types';
import { SortType } from '../types/SortType';

export function getPreperedDataToFilter(
  data: Person[],
  groupBySex: string | null,
  groupByCentury: string[],
  searchQuery: string,
  sort: string | null,
  order: string | null,
) {
  let copyData = [...data];

  if (groupBySex) {
    copyData = copyData.filter(person => person.sex === groupBySex);
  }

  if (groupByCentury.length > 0) {
    copyData = copyData.filter(person =>
      groupByCentury.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (searchQuery.length > 0) {
    const normalizeQuery = searchQuery.toLowerCase().trim();

    copyData = copyData.filter(
      person =>
        person.name.toLowerCase().includes(normalizeQuery) ||
        (person.motherName || '').toLowerCase().includes(normalizeQuery) ||
        (person.fatherName || '').toLowerCase().includes(normalizeQuery),
    );
  }

  if (sort) {
    const direction = order ? -1 : 1;

    copyData = copyData.sort((a, b) => {
      switch (sort) {
        case SortType.name:
          return direction * a.name.localeCompare(b.name);
        case SortType.sex:
          return direction * a.sex.localeCompare(b.sex);
        case SortType.born:
          return direction * (a.born - b.born);
        case SortType.died:
          return direction * (a.died - b.died);
        default:
          return 0;
      }
    });
  }

  return copyData;
}
