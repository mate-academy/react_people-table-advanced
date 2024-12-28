import { Person } from '../types';
import { Filter } from './Filter';

export const findChild = (people: Person[], parentName: string) => {
  const findPerson = people.find(person => person.name === parentName);

  return findPerson;
};

export const columsByTable = [
  'Name',
  'Sex',
  'Born',
  'Died',
  'Mother',
  'Father',
];

export const genderButtons = ['Male', 'Female'];

export const centuryButtons = ['16', '17', '18', '19', '20'];

export const getPreparedPeople = (people: Person[], fields: Filter) => {
  const { sex, query, centuries, sort, order } = fields;
  let peopleList = [...people];

  if (sex) {
    peopleList = peopleList.filter(person => person.sex === sex);
  }

  const normalizeQuery = query.toLowerCase().trim();

  if (normalizeQuery) {
    peopleList = peopleList.filter(person => {
      return (
        person.name.toLowerCase().includes(normalizeQuery) ||
        person.motherName?.toLowerCase().includes(normalizeQuery) ||
        person.fatherName?.toLowerCase().includes(normalizeQuery)
      );
    });
  }

  if (!!centuries.length) {
    peopleList = peopleList.filter(person =>
      centuries.includes(Math.ceil(person.born / 100).toString()),
    );
  }

  if (sort) {
    peopleList = peopleList.sort((prevPerson, nextPerson) => {
      switch (sort) {
        case 'born':
        case 'died':
          return prevPerson[sort] - nextPerson[sort];

        case 'name':
        case 'sex':
          return prevPerson[sort].localeCompare(nextPerson[sort]);

        default:
          return 0;
      }
    });
  }

  if (order) {
    peopleList = peopleList.reverse();
  }

  return peopleList;
};
