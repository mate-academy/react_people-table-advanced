import { SORT_DESC, SortField } from '../enums';
import { Person, SearchParamsType } from '../types';

type GetPreperedPeopleType = (
  people: Person[],
  params: SearchParamsType,
) => Person[];

export const getPreperedPeople: GetPreperedPeopleType = (
  people, {
    query, sex, centuries, sort, order,
  },
) => {
  let preparedPeople = [...people];

  if (query) {
    const preperedQuery = query.toLowerCase().trim();

    preparedPeople = preparedPeople.filter(
      ({ name, motherName, fatherName }) => (
        [name, motherName, fatherName]
          .map((item) => (item || '').trim().toLowerCase())
          .some(item => item.includes(preperedQuery))
      ),
    );
  }

  if (sex) {
    preparedPeople = preparedPeople.filter(person => person.sex === sex);
  }

  if (centuries?.length) {
    preparedPeople = preparedPeople.filter(({ born }) => (
      centuries.some(century => {
        const centuryBegin = (+century - 1) * 100 + 1;
        const centuryEnd = +century * 100;

        return born >= centuryBegin && born <= centuryEnd;
      })));
  }

  if (sort) {
    const orderIndex = order === SORT_DESC ? -1 : 1;

    preparedPeople.sort((personA, personB) => {
      switch (sort) {
        case SortField.Name:
        case SortField.Sex:
          return orderIndex * personA[sort].localeCompare(personB[sort]);

        case SortField.Born:
        case SortField.Died:
          return orderIndex * (personA[sort] - personB[sort]);

        default:
          return 0;
      }
    });
  }

  return preparedPeople;
};
