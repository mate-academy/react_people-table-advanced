import { ServerIPerson, THEADTITLEI } from './interface';

export const THEAD_TITLE: THEADTITLEI = {
  Name: {
    name: 'Name',
    isSortable: true,
  },
  Sex: {
    name: 'Sex',
    isSortable: true,
  },
  Born: {
    name: 'Born',
    isSortable: true,
  },
  Died: {
    name: 'Died',
    isSortable: true,
  },
  Father: {
    name: 'Father',
    isSortable: false,
  },
  Mother: {
    name: 'Mother',
    isSortable: false,
  },
};

export const SORT_ORDER = {
  name: 'both',
  sex: 'both',
  born: 'both',
  died: 'both',
};

export const INITIAL_PERSON: ServerIPerson = {
  name: '',
  sex: '',
  born: 0,
  died: 0,
  fatherName: '',
  motherName: '',
  slug: '',
};

export function filteringPeopleList(query: string, peopleList: ServerIPerson[]): ServerIPerson[] {
  let newPeopleList = [...peopleList];

  if (query) {
    newPeopleList = peopleList.filter(person => (
      (person.name.toLowerCase().includes(query))
      || (((person.fatherName || '') + (person.motherName || ''))
        .toLowerCase().includes(query)
      )));
  }

  return newPeopleList;
}

export function sortingList(
  peopleList: ServerIPerson[],
  title: string,
  order: string,
): ServerIPerson[] {
  const sortList = [...peopleList];

  switch (title) {
    case THEAD_TITLE.Name.name:
      sortList
        .sort((p1, p2) => p1.name
          .localeCompare(p2.name));
      break;
    case THEAD_TITLE.Sex.name:
      sortList
        .sort((p1, p2) => p1.sex.localeCompare(p2.sex));
      break;
    case THEAD_TITLE.Born.name:
      sortList
        .sort((p1, p2) => p1.born - p2.born);
      break;
    case THEAD_TITLE.Died.name:
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
  people: ServerIPerson[],
  sex: string,
  childBorn: number,
) => people.filter(person => person.sex === sex && person.died > childBorn);
