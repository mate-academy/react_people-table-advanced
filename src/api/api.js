const API_URL = 'https://mate-academy.github.io/react_people-table/api';

export const getPeople = () => fetch(`${API_URL}/people.json`)
  .then(response => response.json())
  .then(people => people.map(human => ({
    ...human,
    mother: people.find(person => person.name === human.motherName),
    father: people.find(person => person.name === human.fatherName),
  })));
