export const getPeople = (query = '') => fetch(
  'https://mate-academy.github.io/react_people-table/api/people.json',
)
  .then(response => response.json())
  .then(response => response.map(({
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  }) => ({
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother: response.find(person => person.name === motherName) || null,
    father: response.find(person => person.name === fatherName) || null,
    slug,
  })));
