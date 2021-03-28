const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const people = await fetch(url);

  return people.json();
};
