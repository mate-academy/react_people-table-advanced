import {Person} from "../types";

function isPersonContainsQuery(person: Person, query: string) {
  const validQuery = query.toLowerCase();
  const {name, motherName, fatherName} = person;

  return name.toLowerCase().includes(validQuery)
    || motherName?.toLowerCase().includes(validQuery)
    || fatherName?.toLowerCase().includes(validQuery);
}

function isPersonFitsCentury(person: Person, centuries: string[]) {
  const years = person.died - person.born;
  const birthYear = person.died - years;
  const personCentury = String(Math.floor(birthYear / 100) + 1);

  return centuries.includes(personCentury);
}

export function filterPeople(
  people: Person[], filterParams: [string, string, string[]],
) {
  let filteringPeople = [...people];
  const [sex, query, centuries] = filterParams;

  filteringPeople = filteringPeople.filter(
    person => sex === person.sex || sex === '',
  );

  filteringPeople = filteringPeople.filter(
    person => {
      return query !== ''
        ? isPersonContainsQuery(person, query)
        : true;
    },
  );

  filteringPeople = filteringPeople.filter(
    person => {
      return centuries.length > 0
        ? isPersonFitsCentury(person, centuries)
        : true;
    },
  );

  return filteringPeople;
}
