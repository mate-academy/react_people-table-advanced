import { Person } from '../types';
import { PersonSex } from '../types/Filters';
import { SortType } from '../types/SortType';

function checkQuery(string: string, query: string): boolean {
  const preparedString = string?.toLowerCase().trim();
  const preparedQuery = query.toLowerCase().trim();

  return preparedString.includes(preparedQuery);
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

  if (sort) {
    switch (sort) {
      case (SortType.Name): {
        preparedPeople = preparedPeople.sort(
          (a, b) => a.name.localeCompare(b.name),
        );
        break;
      }

      case (SortType.Sex): {
        preparedPeople = preparedPeople.sort(
          (a, b) => a.sex.localeCompare(b.sex),
        );
        break;
      }

      case (SortType.Born): {
        preparedPeople = preparedPeople.sort(
          (a, b) => a.born - b.born,
        );
        break;
      }

      case (SortType.Died): {
        preparedPeople = preparedPeople.sort(
          (a, b) => a.died - b.died,
        );
        break;
      }

      default: {
        return preparedPeople;
      }
    }

    if (order) {
      preparedPeople = preparedPeople.reverse();
    }
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

  return preparedPeople;
}
