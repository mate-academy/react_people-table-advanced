import { Person } from '../types/Person';

export const getFilteredPeople = (
  people: Person[],
  query: string,
  selectedCenturies: string[],
  selectedSex: string | null,
) => {
  return people.filter(person => {
    const {
      name, motherName, fatherName, born, sex,
    } = person;

    const isQueryMatched = name?.toLowerCase().includes(query)
      || motherName?.toLowerCase().includes(query)
      || fatherName?.toLowerCase().includes(query);

    if (!isQueryMatched) {
      return false;
    }

    const century = String(Math.ceil(born / 100));

    const isCenturiesMatched = selectedCenturies.length
      ? selectedCenturies.includes(century)
      : true;

    if (!isCenturiesMatched) {
      return false;
    }

    const isSexMatched = selectedSex
      ? sex === selectedSex
      : true;

    if (!isSexMatched) {
      return false;
    }

    return true;
  });
};
