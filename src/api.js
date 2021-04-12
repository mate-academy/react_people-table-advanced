const BASE_URL
  = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = () => (
  fetch(BASE_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`can\n't upload your comment`);
      }

      return response.json();
    })
);
