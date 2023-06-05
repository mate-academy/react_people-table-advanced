import { Person } from '../types/Person';

const isNameMatch = (personName: string | null, inputName: string) => {
  return !personName
    ? false
    : personName.toLowerCase().includes(inputName.toLowerCase());
};

const isCenturyMatch = (
  centuries: string[],
  birthYear: number,
) => {
  const personCentury = (Math.ceil(birthYear / 100)).toString();

  return centuries.includes(personCentury);
};

export const filterPeople = (
  people: Person[],
  sex: string,
  inputName: string,
  centuries: string[],
) => {
  return people.filter(({
    name, sex: personSex, born, motherName, fatherName,
  }) => {
    let isMatched = true;

    if (inputName) {
      isMatched = isNameMatch(name, inputName)
        || isNameMatch(motherName, inputName)
        || isNameMatch(fatherName, inputName);
    }

    if (sex) {
      isMatched = isMatched && personSex === sex;
    }

    if (centuries.length) {
      isMatched = isMatched && isCenturyMatch(centuries, born);
    }

    return isMatched;
  });
};
