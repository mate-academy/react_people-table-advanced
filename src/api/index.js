export const getPeople = () => (
  fetch(process.env.REACT_APP_API_URL)
    .then(response => response.json())
);
