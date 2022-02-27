export const getPeople = () => (
  fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(people => people.json())
);
