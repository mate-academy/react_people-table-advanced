import { getCenturyFor } from './getCenturyFor';

import { Sex } from '../enums/Sex';
import { Person } from '../types/Person';

export const filterPeopleBy = (
  people: Person[],
  enteredQuery: string,
  selectedSex: Sex,
  selectedCenturies: string[],
) => {
  return people.filter((person) => {
    const queryLowerCase = enteredQuery.trim().toLowerCase();
    const centuryBorn = getCenturyFor(person.born).toString();

    const isQueryMatch = queryLowerCase
      ? person.name.toLowerCase().includes(queryLowerCase)
        || !!person.fatherName?.toLowerCase().includes(queryLowerCase)
        || !!person.motherName?.toLowerCase().includes(queryLowerCase)
      : true;

    const isSexMatch = selectedSex === Sex.All
      ? true
      : person.sex === selectedSex;

    const isCenturyMatch = selectedCenturies.length
      ? selectedCenturies.includes(centuryBorn)
      : true;

    return isQueryMatch && isSexMatch && isCenturyMatch;
  });
};
