import { Person } from './interface';

export const THEAD_TITLE = {
  name: 'Name',
  sex: 'Sex',
  born: 'Born',
  died: 'Died',
  father: 'Father',
  mother: 'Mother',
};

export const SORT_ORDER = {
  name: 'both',
  sex: 'both',
  born: 'both',
  died: 'both',
};

export const INITIAL_PERSON: Person = {
  name: '',
  sex: '',
  born: 0,
  died: 0,
  father: {
    name: '',
    sex: '',
    born: 0,
    died: 0,
    fatherName: '',
    motherName: '',
    slug: '',
  },
  mother: {
    name: '',
    sex: '',
    born: 0,
    died: 0,
    fatherName: '',
    motherName: '',
    slug: '',
  },
  slug: '',
};

export function filteringPeoleList(query: string, peopleList: Person[]): Person[] {
  let newPeopleList = [...peopleList];

  if (query) {
    newPeopleList = peopleList.filter(person => (person.name
      .toLowerCase()
      .includes(query)
      || (person.father?.name
          .toLowerCase().includes(query)
      || (person.mother?.name
            .toLowerCase().includes(query)
      ))));
  }

  return newPeopleList;
}

export function sortingList(
  peopleList: Person[],
  title: string,
  order: string,
): Person[] {
  const sortList = [...peopleList];

  switch (title) {
    case THEAD_TITLE.name:
      sortList
        .sort((p1, p2) => p1.name
          .localeCompare(p2.name));
      break;
    case THEAD_TITLE.sex:
      sortList
        .sort((p1, p2) => p1.sex.localeCompare(p2.sex));
      break;
    case THEAD_TITLE.born:
      sortList
        .sort((p1, p2) => p1.born - p2.born);
      break;
    case THEAD_TITLE.died:
      sortList
        .sort((p1, p2) => p1.died - p2.died);
      break;
    default:
      break;
  }

  if (order === 'desc') {
    sortList.reverse();
  }

  return sortList;
}

export const filteringPeopleBySex = (
  people: Person[],
  sex: string,
  childBorn: number,
) => {
  const filteringList: string[] = [];

  people.forEach(person => {
    if (person.sex === sex && person.died > childBorn) {
      filteringList.push(person.name);
    }
  });

  return filteringList;
};
