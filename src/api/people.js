export const getPeople = () => (
  // eslint-disable-next-line
  fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(response => response.json())
    .then(persons => persons.map(person => ({
      ...person,
      mother: persons
        .find(individual => person.motherName === individual.name),
      father: persons
        .find(individual => person.fatherName === individual.name),
    })))
);
