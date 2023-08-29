import { Person } from '../types';

type ParamssSort = {
  sex: string;
  query: string;
  centuries: string[];
  sort: string;
  order: string;
};

export const filterPeople = (
  people: Person[],
  params: ParamssSort,
): Person[] => {
  let filteredPeople = people;

  if (params.query) {
    filteredPeople = filteredPeople.filter(person => (
      person.name.toLocaleLowerCase().includes(params.query.toLocaleLowerCase())
      || person.motherName?.toLocaleLowerCase()
        .includes(params.query.toLocaleLowerCase())
      || person.fatherName?.toLocaleLowerCase()
        .includes(params.query.toLocaleLowerCase())
    ));
  }

  if (params.centuries.length > 0) {
    filteredPeople = filteredPeople.filter(person => {
      const century = Math.ceil(person.born / 100).toString();

      return params.centuries.includes(century);
    });
  }

  if (params.sex) {
    filteredPeople = filteredPeople.filter(person => person.sex === params.sex);
  }

  if (params.sort) {
    filteredPeople = filteredPeople.sort((a, b) => {
      if (params.sort === 'name' || params.sort === 'sex') {
        return params.order
          ? b[params.sort].localeCompare(a[params.sort])
          : b[params.sort].localeCompare(a[params.sort]);
      }

      if (params.sort === 'born' || params.sort === 'died') {
        return params.order
          ? +b[params.sort] - +a[params.sort]
          : +b[params.sort] - +a[params.sort];
      }

      return 0;
    });
  }

  return filteredPeople;
};
