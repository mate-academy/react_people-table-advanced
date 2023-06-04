import { Person } from './types/Person';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

function wait(delay: number) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function getPeople(): Promise<Person[]> {
  return wait(500)
    .then(() => fetch(API_URL))
    .then(response => response.json());
}

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
    name,
    sex: personSex,
    born,
    motherName,
    fatherName,
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

export const sortPeople = (
  people: Person[],
  sort: string,
  order: string,
) => {
  const sortedPeople = [...people].sort((firstPerson, secondPerson) => {
    switch (sort) {
      case 'name':
        return firstPerson.name.localeCompare(secondPerson.name);
      case 'sex':
        return firstPerson.sex.localeCompare(secondPerson.sex);
      case 'born':
        return firstPerson.born - secondPerson.born;
      case 'died':
        return firstPerson.died - secondPerson.died;

      default:
        return 0;
    }
  });

  return order ? sortedPeople.reverse() : sortedPeople;
};
