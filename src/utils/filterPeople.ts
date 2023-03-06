import { Person } from '../types';

export function filterPeople(
  people: Person[],
  query: string,
  centuries: string[],
  sex: string,
) {
  const lowerQuery = query.toLowerCase();

  return people.filter(person => {
    const {
      name,
      fatherName,
      motherName,
      born,
    } = person;
    const lowerName = name.toLowerCase();
    const lowerFatherName = fatherName?.toLowerCase();
    const lowerMotherName = motherName?.toLowerCase();
    const centuryOfBirth = Math.ceil(Number(born) / 100).toString();

    const queryCondition = lowerName.includes(lowerQuery)
    || lowerFatherName?.includes(lowerQuery)
    || lowerMotherName?.includes(lowerQuery);
    const centuryCondition = centuries.length
      ? centuries.includes(centuryOfBirth)
      : true;
    const sexCondition = !sex
      ? true
      : sex === person.sex;

    return (queryCondition && centuryCondition && sexCondition);
  });
}
