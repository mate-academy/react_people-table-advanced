const url = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => (
  fetch(url)
    .then(response => {
      if (!response.ok) {
        return new Error(`Error : ${response.status}`);
      }

      return response.json();
    })
);
