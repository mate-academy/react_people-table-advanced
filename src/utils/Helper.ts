import { Person } from '../types';

export const findPersonByName = (
  nameToFind: string | null,
  people: Person[],
): Person | null => {
  if (!nameToFind) {
    return null;
  }

  return people.find(({ name }) => name === nameToFind) || null;
};

const chackPersonBySexCondition = (
  sex: string | null,
  person: Person,
): boolean => {
  if (!sex) {
    return true;
  }

  return person.sex === sex;
};

const chackPersonByCenturiesCondition = (
  centuries: string[],
  person: Person,
): boolean => {
  if (!centuries.length) {
    return true;
  }

  return centuries.includes(String(Math.ceil(person.born / 100)));
};

const caseInsensitiveCompare = (str1: string, str2: string) => {
  return str1.toLowerCase().includes(str2.toLocaleLowerCase());
};

const chackPersonBySearchQuery = (
  query: string,
  person: Person,
): boolean => {
  if (!query) {
    return true;
  }

  const { name, fatherName, motherName } = person;

  const father = fatherName
    ? caseInsensitiveCompare(fatherName, query)
    : null;
  const mother = motherName
    ? caseInsensitiveCompare(motherName, query)
    : null;
  const personName = caseInsensitiveCompare(name, query);

  return father || mother || personName;
};

const getSortedPeople = (people: Person[], sortType: string | null) => {
  switch (sortType) {
    case 'name':
      return people.sort((a, b) => a.name.localeCompare(b.name));
    case 'sex':
      return people.sort((a, b) => a.sex.localeCompare(b.sex));
    case 'born':
      return people.sort((a, b) => a.born - b.born);
    case 'died':
      return people.sort((a, b) => a.died - b.died);
    default:
      return people;
  }
};

export const getFilteredPeople = (
  searchParams: URLSearchParams,
  people: Person[],
) => {
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const sexCondition = chackPersonBySexCondition(sex, person);
    const centuriesCondition = chackPersonByCenturiesCondition(
      centuries,
      person,
    );
    const searchQueryCondition = chackPersonBySearchQuery(query, person);

    return sexCondition && centuriesCondition && searchQueryCondition;
  });

  const sortedPeople = getSortedPeople(filteredPeople, sort);

  return order ? sortedPeople.reverse() : sortedPeople;
};
