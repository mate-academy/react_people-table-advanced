import {
  Person, Sex, SearchField, SortParam,
} from '../types';

const sexOrder = Object.values(Sex);

function sortPeople(people: Person[], sortParam: string, order: number) {
  switch (sortParam) {
    case SortParam.Name:
      return people.sort((a, b) => order * a.name.localeCompare(b.name));
    case SortParam.Sex:
      return people.sort((a, b) => order * (
        sexOrder.indexOf(a.sex) - sexOrder.indexOf(b.sex)));
    case SortParam.Born:
      return people.sort((a, b) => order * (a.born - b.born));
    case SortParam.Died:
      return people.sort((a, b) => order * (a.died - b.died));
    default: return people;
  }
}

function filterPeople(people: Person[], searchParams: URLSearchParams) {
  let newPeople = [...people];
  const query = searchParams.get(SearchField.Query)?.trim();
  const sex = searchParams.get(SearchField.Sex);
  const centuries = searchParams.getAll(SearchField.Centuries);

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

export function mappedPeople(people : Person[]) {
  people.map((person) => {
    const editedPerson = { ...person };
    const mother = people.find(({ name }) => name === person.motherName);
    const father = people.find(({ name }) => name === person.fatherName);

    if (mother) {
      editedPerson.mother = mother;
    }

    if (father) {
      editedPerson.father = father;
    }

    return editedPerson;
  });

  return people;
}
