import { Person } from '../types';
import { Sex } from '../types/Sex';

export const filterPeople = (
  initialPeople: Person[],
  sexParam: Sex,
  queryParam: string,
  centuriesParam: string[],
) => {
  let prepairedPeople = [...initialPeople];

  if (sexParam) {
    prepairedPeople = prepairedPeople
      .filter((person: Person) => person.sex === sexParam);
  }

  if (queryParam) {
    const normalizedQueryParam = queryParam.toLowerCase();

    prepairedPeople = prepairedPeople
      .filter((person: Person) => {
        const { name, motherName, fatherName } = person;
        const normalizedPersonName = name.toLowerCase();
        const normalizedMotherName = motherName?.toLowerCase();
        const normalizedFatherName = fatherName?.toLowerCase();

        return normalizedPersonName.includes(normalizedQueryParam)
        || normalizedFatherName?.includes(normalizedQueryParam)
        || normalizedMotherName?.includes(normalizedQueryParam);
      });
  }

  if (centuriesParam.length > 0) {
    prepairedPeople = prepairedPeople
      .filter((person: Person) => centuriesParam
        .includes(Math.ceil(person.died / 100).toString()));
  }

  return prepairedPeople;
};
