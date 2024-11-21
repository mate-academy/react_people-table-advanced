import { Person } from '../types';

export const getVisiblePeople = (
  people: Person[],
  {
    nameQuery,
    sex,
    centuries,
    sort,
    order,
  }: {
    nameQuery: string;
    sex: string | null;
    centuries: string[];
    sort: string | null;
    order: string | null;
  },
) => {
  let visiblePeople = [...people];

  const preparedNameQuery = nameQuery.toLowerCase().trim();

  if (preparedNameQuery) {
    visiblePeople = visiblePeople.filter(person => {
      const { name, motherName, fatherName } = person;

      const preparedPersonName = name.toLowerCase();
      const preparedMotherName = motherName?.toLowerCase();
      const preparedFatherName = fatherName?.toLowerCase();

      return (
        preparedPersonName.includes(preparedNameQuery) ||
        preparedMotherName?.includes(preparedNameQuery) ||
        preparedFatherName?.includes(preparedNameQuery)
      );
    });
  }

  if (sex) {
    visiblePeople = visiblePeople.filter(person => person.sex === sex);
  }

  if (!!centuries.length) {
    visiblePeople = visiblePeople.filter(person => {
      const century = Math.ceil(person.born / 100);

      return centuries.includes(century.toString());
    });
  }

  if (sort) {
    visiblePeople = visiblePeople.sort((currentPerson, nextPerson) => {
      switch (sort) {
        case 'born':
        case 'died':
          return currentPerson[sort] - nextPerson[sort];

        case 'name':
        case 'sex':
          return currentPerson[sort].localeCompare(nextPerson[sort]);

        default:
          return 0;
      }
    });
  }

  if (order) {
    visiblePeople = visiblePeople.reverse();
  }

  return visiblePeople;
};
