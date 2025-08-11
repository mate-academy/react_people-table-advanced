import { Person } from '../types';

export function filterPeople(
  genderType: string | null,
  centuries: string[],
  queryType: string | null,
  people: Person[],
) {
  function matchingQuery(person: Person, query: string) {
    const { name, motherName, fatherName } = person;
    const normalizedName = name.toLowerCase();

    const normalizedMotherName = motherName?.toLowerCase();
    const normalizedFatherName = fatherName?.toLowerCase();

    if (
      normalizedName.includes(query) ||
      normalizedMotherName?.includes(query) ||
      normalizedFatherName?.includes(query)
    ) {
      return name;
    } else {
      return;
    }
  }

  const filteredByGender = genderType
    ? people.filter(pers => pers.sex === genderType)
    : people;

  const filteredByCenturies = !!centuries.length
    ? filteredByGender.filter(person =>
        centuries.includes(Math.ceil(person.born / 100).toString()),
      )
    : filteredByGender;

  const filteredByQuery = queryType
    ? filteredByCenturies.filter(personItem =>
        matchingQuery(personItem, queryType),
      )
    : filteredByCenturies;

  return filteredByQuery;
}
