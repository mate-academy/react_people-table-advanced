import { Person } from '../../types';

export const filterPeopleByCenturies = (
  peopleArray: Person[],
  selectedCenturies: string[],
) => {
  return peopleArray.filter(person => {
    const personCentury = Math.ceil(person.born / 100).toString();

    return selectedCenturies.includes(personCentury);
  });
};
