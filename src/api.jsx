const API = `https://mate-academy.github.io/react_people-table/api/people.json`;

export function getPeople() {
  return fetch(API)
    .then(people => people.json())
    .then(peopleArr => peopleArr.map(person => ({
      ...person,
      motherObj: peopleArr.find(
        mother => mother.name === person.motherName,
      ),
      fatherObj: peopleArr.find(
        father => father.name === person.fatherName,
      ),
    })));
}
