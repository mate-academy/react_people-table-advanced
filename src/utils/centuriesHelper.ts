import { Person } from '../types';

type FilterParams = {
  sex?: 'm' | 'f';
  centuries?: number[];
  query?: string;
};

type Sort = {
  sortBy?: 'name' | 'sex' | 'born' | 'died';
  reverse?: boolean;
};

export class PersonHelpers {
  public static filter(
    persons: Person[],
    filterParams?: FilterParams,
    sort?: Sort,
  ) {
    let personsFiltereds = [...persons];

    if (filterParams?.sex !== undefined) {
      personsFiltereds = personsFiltereds.filter(
        person => person.sex === filterParams?.sex,
      );
    }

    if (filterParams?.centuries?.length) {
      personsFiltereds = personsFiltereds.filter(person =>
        filterParams?.centuries?.includes(Math.floor(person.born / 100) + 1),
      );
    }

    if (filterParams?.query?.trim()) {
      const queryString = filterParams.query.trim().toLowerCase();

      personsFiltereds = personsFiltereds.filter(person => {
        switch (true) {
          case person.name.toLowerCase().includes(queryString):
          case person.fatherName?.toLowerCase().includes(queryString):
          case person.motherName?.toLowerCase().includes(queryString):
            return true;

          default:
            return false;
        }
      });
    }

    switch (sort?.sortBy) {
      case 'name': {
        const filtered = personsFiltereds.sort((person1, person2) =>
          person1.name.localeCompare(person2.name),
        );

        return sort?.reverse ? filtered.reverse() : filtered;
      }

      case 'sex': {
        const filtered = personsFiltereds.sort((person1, person2) =>
          person1.sex.localeCompare(person2.sex),
        );

        return sort?.reverse ? filtered.reverse() : filtered;
      }

      case 'born': {
        const filtered = personsFiltereds.sort(
          (person1, person2) => person1.born - person2.born,
        );

        return sort?.reverse ? filtered.reverse() : filtered;
      }

      case 'died': {
        const filtered = personsFiltereds.sort(
          (person1, person2) => person1.died - person2.died,
        );

        return sort?.reverse ? filtered.reverse() : filtered;
      }

      default:
        return personsFiltereds;
    }
  }
}
