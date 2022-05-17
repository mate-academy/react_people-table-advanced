const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something wrong...');
      }

      return res.json();
    });
};
