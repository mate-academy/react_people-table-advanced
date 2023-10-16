import { Person } from '../types';
import { PersonSex } from '../types/Filters';
import { SortType } from '../types/SortType';

function checkQuery(string: string, query: string): boolean {
  const preparedString = string?.toLowerCase().trim();
  const preparedQuery = query.toLowerCase().trim();

  return preparedString.includes(preparedQuery);
}

function getSortedPeople(
  people: Person[],
  sort: string | null,
  order: string | null,
) {
  let sortedPeople = people;

  if (sort) {
    switch (sort) {
      case (SortType.Name): {
        sortedPeople = sortedPeople.sort(
          (a, b) => a.name.localeCompare(b.name),
        );
        break;
      }

      case (SortType.Sex): {
        sortedPeople = sortedPeople.sort(
          (a, b) => a.sex.localeCompare(b.sex),
        );
        break;
      }

      case (SortType.Born): {
        sortedPeople = sortedPeople.sort(
          (a, b) => a.born - b.born,
        );
        break;
      }

      case (SortType.Died): {
        sortedPeople = sortedPeople.sort(
          (a, b) => a.died - b.died,
        );
        break;
      }

      default: {
        return sortedPeople;
      }
    }

    if (order) {
      sortedPeople = sortedPeople.reverse();
    }
  }

  return sortedPeople;
}

export function getPreparedPeople(
  people: Person[],
  sex: string | null,
  centuries: string[],
  query: string,
  sort: string | null,
  order: string | null,
) {
  let preparedPeople = [...people];

  if (sex === PersonSex.Male) {
    preparedPeople = preparedPeople.filter((person) => {
      return person.sex === PersonSex.Male;
    });
  }

  if (sex === PersonSex.Female) {
    preparedPeople = preparedPeople.filter((person) => {
      return person.sex === PersonSex.Female;
    });
  }

  if (centuries.length !== 0) {
    preparedPeople = preparedPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return centuries.includes(century);
    });
  }

  if (query) {
    preparedPeople = preparedPeople.filter(person => {
      return checkQuery(person.name, query)
      || checkQuery(person.motherName ?? '', query)
      || checkQuery(person.fatherName ?? '', query);
    });
  }

  getSortedPeople(preparedPeople, sort, order);

  preparedPeople = preparedPeople.map((person) => {
    const mother = people.find(mom => mom.name === person.motherName);
    const father = people.find(dad => dad.name === person.fatherName);

    return { ...person, mother, father };
  });

  return preparedPeople;
}
