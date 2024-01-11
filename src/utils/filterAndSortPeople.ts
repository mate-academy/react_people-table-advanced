import { Person } from '../types';
import { PersonSex, SortBy } from '../types/Filters';

interface Props {
  people: Person[]
  nameQuery: string | null
  filterSex: string | null
  filterCenturies: string[]
  sort: string | null
  order: string | null
}

export const filterAndSortPeople = ({
  people,
  nameQuery = '',
  filterSex = '',
  filterCenturies = [],
  sort = '',
  order = null,
}: Props) => {
  let preparedPeople = [...people];

  if (nameQuery) {
    preparedPeople = preparedPeople.filter(
      (person) => (
        person.name.includes(nameQuery)
        || person.motherName?.includes(nameQuery)
        || person.fatherName?.includes(nameQuery)
      ),
    );
  }

  if (filterSex && filterSex !== PersonSex.All) {
    preparedPeople = preparedPeople.filter(({ sex }) => sex === filterSex);
  }

  if (filterCenturies && filterCenturies.length) {
    preparedPeople = preparedPeople.filter(({ born }) => {
      const bornCentury = Math.ceil(born / 100).toString();

      return filterCenturies.includes(bornCentury);
    });
  }

  if (sort) {
    switch (sort) {
      case SortBy.Name:
        preparedPeople.sort(({ name: a }, { name: b }) => {
          return order ? b.localeCompare(a) : a.localeCompare(b);
        });
        break;
      case SortBy.Sex:
        preparedPeople.sort(({ sex: a }, { sex: b }) => {
          return order ? b.localeCompare(a) : a.localeCompare(b);
        });
        break;
      case SortBy.Born:
        preparedPeople.sort(({ born: a }, { born: b }) => {
          return order ? b - a : a - b;
        });
        break;
      case SortBy.Died:
        preparedPeople.sort(({ died: a }, { died: b }) => {
          return order ? b - a : a - b;
        });
        break;
      default:
        return preparedPeople;
    }
  }

  return preparedPeople;
};
