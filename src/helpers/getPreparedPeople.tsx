import { Person } from '../types';

export interface FilterParam {
  sort: string;
  order: string;
  sex: string;
  query: string;
  centuries: string[];
}

export function getPreparedPeople(people: Person[], filterParam: FilterParam) {
  let preparedPeople = [...people];

  if (filterParam.sex) {
    preparedPeople = preparedPeople
      .filter(person => person.sex === filterParam.sex);
  }

  if (filterParam.centuries.length) {
    preparedPeople = preparedPeople.filter(person => (
      filterParam.centuries.includes(Math.ceil(person.born / 100).toString())
    ));
  }

  if (filterParam.query) {
    const normalizedQuery = filterParam.query.toLowerCase();

    preparedPeople = preparedPeople
      .filter(person => {
        return person.name.toLowerCase().includes(normalizedQuery)
          || person.motherName?.toLowerCase().includes(normalizedQuery)
          || person.fatherName?.toLowerCase().includes(normalizedQuery);
      });
  }

  if (filterParam.sort) {
    const reverseFactor = filterParam.order ? -1 : 1;

    preparedPeople = [...preparedPeople].sort((a, b) => {
      switch (filterParam.sort) {
        case 'name':
        case 'sex':
          return a[filterParam.sort]
            .localeCompare(b[filterParam.sort]) * reverseFactor;

        case 'born':
        case 'died':
          return (a[filterParam.sort] - b[filterParam.sort]) * reverseFactor;

        default:
          return 1;
      }
    });
  }

  return preparedPeople;
}
