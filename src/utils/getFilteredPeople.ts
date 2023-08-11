import { Person } from '../types';
import { SortField } from './options';

type Props = {
  people: Person[];
  sex: string;
  centuries: string[];
  query: string;
  sort: string;
  order: string;
};

function normalized(string: string | null) {
  return string ? string.toLowerCase() : '';
}

function getCentury(born: number) {
  return `${Math.ceil(born / 100)}`;
}

export const getFilteredPeople = ({
  people,
  sex,
  query,
  centuries,
  sort,
  order,
}: Props) => {
  let preparedPeople = people;

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (query) {
    const normalizedQuery = normalized(query).trim();

    preparedPeople = preparedPeople.filter(person => {
      const normalizedName = normalized(person.name);
      const normalizedMotherName = normalized(person?.motherName) || '';
      const normalizedFatherName = normalized(person?.fatherName) || '';

      return (
        normalizedName.includes(normalizedQuery)
          || normalizedMotherName.includes(normalizedQuery)
          || normalizedFatherName.includes(normalizedQuery)
      );
    });
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person => (
      centuries.includes(getCentury(person.born))
    ));
  }

  if (sort) {
    preparedPeople = [...preparedPeople].sort((p1, p2) => {
      switch (sort) {
        case SortField.Name:
        case SortField.Sex:
          return p1[sort].localeCompare(p2[sort]);

        case SortField.Born:
        case SortField.Died:
          return p1[sort] - p2[sort];
        default:
          return 0;
      }
    });
  }

  if (order === 'desc') {
    preparedPeople.reverse();
  }

  return preparedPeople;
};
