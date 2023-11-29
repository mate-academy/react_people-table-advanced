import { Person } from '../types';

function sortPeople(people: Person[], sortParam: string, order: number) {
  switch (sortParam) {
    case 'name':
      return people.sort((a, b) => order * a.name.localeCompare(b.name));
    case 'sex':
      return people.sort((a, b) => order * a.sex.localeCompare(b.sex));
    case 'born':
      return people.sort((a, b) => order * (a.born - b.born));
    case 'died':
      return people.sort((a, b) => order * (a.died - b.died));
    default: return people;
  }
}

function filterPeople(people: Person[], searchParams: URLSearchParams) {
  let newPeople = [...people];
  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  if (sex) {
    newPeople = people.filter(human => human.sex === sex);
  }

  if (query) {
    newPeople = newPeople.filter(human => (
      human.name.toLowerCase().includes(query.toLowerCase())
      || human.motherName?.toLowerCase().includes(query.toLowerCase())
      || human.fatherName?.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (centuries.length) {
    newPeople = newPeople.filter(human => centuries
      .includes(Math.floor((human.born / 100) + 1).toString()));
  }

  return newPeople;
}

export function proceedPeople(
  people: Person[],
  searchParams: URLSearchParams,
) {
  let newPeople = filterPeople(people, searchParams);

  const sortType = searchParams.get('sort');
  const order = searchParams.get('order') ? -1 : 1;

  if (sortType) {
    newPeople = sortPeople(newPeople, sortType, order);
  }

  return newPeople;
}
