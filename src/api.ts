const Api = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => {
  return fetch(Api)
    .then(res => res.json());
};
