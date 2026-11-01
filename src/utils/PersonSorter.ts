import { Person } from '../types';
import { SortOrder, SortParams } from '../types/SortParams';

export class PersonSorter {
  public static SortBy(
    sortBy: SortParams,
    order: SortOrder,
  ): (a: Person, b: Person) => number {
    const orderMultiplier = order === SortOrder.Asc ? 1 : -1;

    switch (sortBy) {
      case SortParams.Born:
        return (a: Person, b: Person) => (a.born - b.born) * orderMultiplier;
      case SortParams.Died:
        return (a: Person, b: Person) => (a.died - b.died) * orderMultiplier;
      case SortParams.Name:
        return (a: Person, b: Person) =>
          a.name.localeCompare(b.name) * orderMultiplier;
      case SortParams.Sex:
        return (a: Person, b: Person) =>
          a.sex.localeCompare(b.sex) * orderMultiplier;
      default:
        return () => 0;
    }
  }
}
