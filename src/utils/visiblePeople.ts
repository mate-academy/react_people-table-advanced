import { Person } from "../types";

export const visiblePeople = (
  people: Person[],
  query: string,
  sex: string | null,
  centuries: string[],
) => {
  let preparePeople = [...people];

  const preparedQuery = query.toLocaleLowerCase();

  if (preparedQuery) {
    preparePeople = preparePeople.filter(person => {
      return (person.name.toLocaleLowerCase().includes(preparedQuery)
        || person.motherName?.toLocaleLowerCase().includes(preparedQuery)
        || person.fatherName?.toLocaleLowerCase().includes(preparedQuery))});
  }

  if (sex) {
    preparePeople = preparePeople.filter(person => person.sex === sex);
  }

  const getCentury = (born: number) => {
    return (Math.floor((born - 1) / 100) + 1).toString();
  }

  if (centuries.length) {
    preparePeople = preparePeople.filter(person=> centuries.includes(getCentury(person.born)));
  }



  return preparePeople;
}
