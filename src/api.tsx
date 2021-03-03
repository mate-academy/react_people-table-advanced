export const fetchPeople = async() => {
  const people = await fetch('https://mate-academy.github.io/react_people-table/api/people.json')
    .then(request => request.json());

  return people;
}
