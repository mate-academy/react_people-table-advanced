import { Person } from '../types';

export const filterPeople = (
  people: Person[],
  sex:string | null,
  centuries:string[],
  query:string | null,
) => {
  let prepearedPeople = [...people];

  if (sex) {
    prepearedPeople = prepearedPeople.filter(person => person.sex === sex);
  }

  if (centuries.length > 0) {
    const getCentury = (person: Person) => Math.ceil(person.born / 100);

    prepearedPeople = prepearedPeople.filter(
      person => centuries.includes(
        getCentury(person).toString(),
      ),
    );
  }

  if (query) {
    const lowerQuery = query.toLowerCase();

    prepearedPeople = prepearedPeople.filter(person => {
      const checkStr = (
        person.name
        + person.motherName
        + person.fatherName
      ).toLowerCase();

      return checkStr.includes(lowerQuery);
    });
  }

  return prepearedPeople;
};
