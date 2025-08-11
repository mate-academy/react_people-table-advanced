import { Person } from '../types/Person';

export const filterPeople = (
  people: Person[],
  query: string,
  gender: string,
  centuries: string[],
) => {
  const formattedQuery = query.trim().toLowerCase();

  return people
    .filter(person => person.name.toLowerCase().includes(formattedQuery))
    .filter(person => (gender ? person.sex === gender : true))
    .filter(person =>
      centuries.length
        ? centuries.includes(Math.ceil(person.born / 100).toString())
        : true,
    );
};

export const sortPeople = (people: Person[], sort: string, order: string) => {
  return people.sort((firstPerson, secondPerson) => {
    let result = 0;

    switch (sort) {
      case 'name':
        result = firstPerson.name.localeCompare(secondPerson.name);
        break;
      case 'sex':
        result = firstPerson.sex.localeCompare(secondPerson.sex);
        break;
      case 'born':
        result = firstPerson.born - secondPerson.born;
        break;
      case 'died':
        result = firstPerson.died - secondPerson.died;
        break;
    }

    return order === 'desc' ? -result : result;
  });
};
