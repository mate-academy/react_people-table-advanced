// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_people-table/api/people.json';

export const getPeople = async() => {
  const peopleArr = await fetch(API_URL).then(res => res.json());

  return peopleArr
    .map(human => (
      {
        ...human,
        mother: peopleArr
          .find(mother => mother.name === human.motherName) || null,
        father: peopleArr
          .find(father => father.name === human.fatherName) || null,
      }
    ));
};

export const filterPeople = (people, query) => people
  .filter(({ name, motherName, fatherName }) => (
    `${name}${motherName}${fatherName}`.toLowerCase()
      .includes(query.toLowerCase())
  ));
