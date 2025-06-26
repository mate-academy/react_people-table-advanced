import { Person } from '../../types';
import { calculateCentury } from '../calculateCentury';
import { isInclude } from '../isInclude';

interface Filters {
  sexSearchParam: string;
  querySearchParam: string;
  centuriesSearchParams: string[];
}

export const filterPeople = (humens: Person[], filters: Filters) => {
  let preparePeople = [...humens];

  if (filters.sexSearchParam !== '') {
    preparePeople = preparePeople.filter(
      person => person.sex === filters.sexSearchParam,
    );
  }

  if (filters.querySearchParam !== '') {
    preparePeople = preparePeople.filter(
      person =>
        isInclude(person.name, filters.querySearchParam) ||
        isInclude(person.motherName, filters.querySearchParam) ||
        isInclude(person.fatherName, filters.querySearchParam),
    );
  }

  if (filters.centuriesSearchParams.length !== 0) {
    preparePeople = filters.centuriesSearchParams
      .map(century =>
        preparePeople.filter(
          person => calculateCentury(person.born) === century,
        ),
      )
      .flat();
  }

  return preparePeople;
};
