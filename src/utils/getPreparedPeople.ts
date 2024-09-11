import { Person } from '../types';
import { SortParams } from '../types/Enums';

function checkCenturyOfLive(centuries: string[], person: Person) {
  return centuries.some(century => {
    const centuryEnd = +(century + '00');
    const centuryStart = centuryEnd - 100;

    return centuryStart <= +person.born && +person.born < centuryEnd;
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
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (preparedQuery) {
    preparedPeople = preparedPeople.filter(person => {
      const { name, fatherName = '', motherName = '' } = person;

      return [name, fatherName, motherName].some(field =>
        field?.toLowerCase().includes(preparedQuery),
      );
    });
  }

  if (centuries.length) {
    preparedPeople = preparedPeople.filter(person =>
      checkCenturyOfLive(centuries, person),
    );
  }

  if (activeSort) {
    preparedPeople.sort((prevPerson, nextPerson) => {
      switch (activeSort) {
        case SortParams.Name:
        case SortParams.Sex:
          return prevPerson[activeSort].localeCompare(nextPerson[activeSort]);
        case SortParams.Born:
        case SortParams.Died:
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
