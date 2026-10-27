import { Person } from '../../types';
import { CollBeakFilter } from './CollBeakFilter';

export class PersonFilter {
  public static Filter(
    people: Person[],
    ...predicates: ((person: Person) => boolean)[]
  ): Person[] {
    return CollBeakFilter.Filter<Person>(people, predicates);
  }

  public static FilterByName(query: string): (person: Person) => boolean {
    const normalizedQuery = query.trim().toLowerCase();

    return ({ name, fatherName, motherName }: Person) => {
      return !!(
        name.toLowerCase().includes(normalizedQuery) ||
        fatherName?.toLowerCase().includes(normalizedQuery) ||
        motherName?.toLowerCase().includes(normalizedQuery)
      );
    };
  }

  public static FilterBySex(sex: string): (person: Person) => boolean {
    return ({ sex: personSex }: Person) => sex === personSex;
  }

  public static FilterByCenturies(
    ...centuries: number[]
  ): (person: Person) => boolean {
    return ({ born }: Person) => {
      const century = Math.ceil(born / 100);

      return centuries.includes(century);
    };
  }
}
