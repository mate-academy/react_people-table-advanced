import { Person } from '../types';

const isQueryMatching = (value: string | null, query: string) => {
  if (!value) {
    return false;
  }

  return value.toLowerCase().includes(query.toLowerCase());
};

const isCenturyMatching = (personDied: number, centuries: string[]) => {
  const personDiedCentury = String(Math.ceil(personDied / 100));

  return centuries.includes(personDiedCentury);
};

export const filterPeople = (
  people: Person[],
  query: string,
  sex: string,
  centuries: string[],
) => {
  return people.filter(
    ({
      name,
      fatherName,
      motherName,
      sex: personSex,
      died,
    }) => {
      let isMatched = true;

      if (query) {
        isMatched = isQueryMatching(name, query)
        || isQueryMatching(fatherName, query)
        || isQueryMatching(motherName, query);
      }

      if (sex) {
        isMatched = isMatched && personSex === sex;
      }

      if (centuries.length) {
        isMatched = isMatched && isCenturyMatching(died, centuries);
      }

      return isMatched;
    },
  );
};
