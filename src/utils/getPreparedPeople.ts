import { Person } from '../types';

function checkCenturyOfLive(centuries: string[], person: Person) {
  return centuries.some(century => {
    const centuryEnd = +(century + '00');
    const centuryStart = centuryEnd - 100;

    if (centuryStart <= +person.born && +person.born < centuryEnd) {
      return true;
    }

    return false;
  });
}

export const getPreparedPeople = (
  people: Person[],
  sex: string | null,
  query: string | null,
  centuries: string[],
  activeSort: string | null,
  isDesc: string | null,
) => {
  let preparedPeople = [...people];
  const preparedQuery = query?.trim().toLowerCase();

  if (sex) {
    switch (sex) {
      case 'f':
        preparedPeople = preparedPeople.filter(person => person.sex === 'f');
        break;
      case 'm':
        preparedPeople = preparedPeople.filter(person => person.sex === 'm');
        break;
    }
  }

  if (preparedQuery) {
    preparedPeople = preparedPeople.filter(
      person =>
        person.name.toLowerCase().includes(preparedQuery) ||
        person.fatherName?.toLowerCase().includes(preparedQuery) ||
        person.motherName?.toLowerCase().includes(preparedQuery),
    );
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person =>
      checkCenturyOfLive(centuries, person),
    );
  }

  if (activeSort) {
    preparedPeople.sort((prevPerson, nextPerson) => {
      switch (activeSort) {
        case 'name':
        case 'sex':
          return prevPerson[activeSort].localeCompare(nextPerson[activeSort]);
        case 'born':
        case 'died':
          return +prevPerson[activeSort] - +nextPerson[activeSort];
        default:
          return 0;
      }
    });

    if (isDesc) {
      preparedPeople.reverse();
    }
  }

  return preparedPeople;
};
