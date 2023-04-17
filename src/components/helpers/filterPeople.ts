import { Person } from '../../types';

export const filterPeople = (
  sex: string | null,
  query: string | null,
  centuries: string[],
  people: Person[],
): Person[] => {
  let filteredPeople;

  switch (true) {
    case Boolean(sex):
      filteredPeople = people.filter(person => person.sex === sex);
      break;

    case Boolean(query):
      filteredPeople = people.filter(person => {
        const { name, fatherName, motherName } = person;
        const check = (name + fatherName + motherName).toLowerCase();

        return query && check.includes(query.toLowerCase());
      });
      break;

    case centuries.length > 0:
      filteredPeople = people.filter(person => {
        const century = Math.ceil(person.born / 100);

        return centuries.includes(century.toString());
      });
      break;

    default:
      filteredPeople = [...people];
  }

  return filteredPeople;
};
