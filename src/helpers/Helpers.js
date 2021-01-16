const BASE_URL = (
  `https://mate-academy.github.io/react_people-table/api/people.json`);

export const getPeople = () => (
  fetch(`${BASE_URL}`)
    .then(response => response.json())
    .then(res => res.map(person => ({
      name: person.name,
      sex: person.sex === 'f' ? 'female' : 'male',
      born: person.born,
      died: person.died,
      mother: person.motherName,
      father: person.fatherName,
      slug: person.slug,
    })))
);

export const validName = (name, born) => (
  name && born ? `${name.split(' ').join('-').toLowerCase()}-${born}` : ''
);

export const makeName = name => name[0].toUpperCase() + name.slice(1);

export const initPerson = {
  name: '',
  sex: '',
  born: '',
  died: '',
  father: '',
  mother: '',
  slug: '',
};

export const initErrors = {
  Name: [],
  Sex: [],
  Born: [],
  Died: [],
  Father: [],
  Mother: [],
};
