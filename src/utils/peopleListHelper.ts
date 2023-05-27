import { getPeople } from '../api';
import { Person } from '../types';

export const getFullPeopleList = async () => {
  const peopleFromServer = await getPeople();

  return peopleFromServer.map(person => {
    const { motherName, fatherName } = person;
    const mother = peopleFromServer.find(({ name }) => name === motherName);
    const father = peopleFromServer.find(({ name }) => name === fatherName);

    return { ...person, mother, father };
  });
};

const filterBySex = (
  peopleList: Person[],
  sex: string,
) => (
  peopleList.filter(person => person.sex === sex)
);

const filterByQuery = (
  peopleList: Person[],
  query: string,
) => (
  peopleList.filter(person => (
    person.name.toLowerCase().includes(query.trim().toLowerCase())
  ))
);

const filterByCenturies = (
  peopleList: Person[],
  centuries: string[],
) => (
  peopleList.filter(person => {
    const centuryOfBorn = String(Math.ceil(person.born / 100));

    return centuries.includes(centuryOfBorn);
  })
);

export const preparePeopleList = (
  peopleList: Person[] | null,
  searchParams: URLSearchParams,
) => {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  if (!peopleList) {
    return null;
  }

  let preparedList = [...peopleList];

  if (sex) {
    preparedList = filterBySex(preparedList, sex);
  }

  if (query) {
    preparedList = filterByQuery(preparedList, query);
  }

  if (centuries.length > 0) {
    preparedList = filterByCenturies(preparedList, centuries);
  }

  if (sort) {
    preparedList.sort((person1, person2) => {
      const desc = order === 'desc' ? -1 : 1;

      switch (sort) {
        case 'name':
          return person1.name.localeCompare(person2.name) * desc;
        case 'sex':
          return person1.sex.localeCompare(person2.sex) * desc;
        case 'born':
          return (person1.born - person2.born) * desc;
        case 'died':
          return (person1.born - person2.born) * desc;
        default:
          return 0;
      }
    });
  }

  return preparedList;
};
