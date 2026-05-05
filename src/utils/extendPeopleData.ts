import Person from '../types/Person';

const extendPeopleData = (people: Person[]) => {
  if (people.length === 0) {
    return people;
  } else {
    return people.map(pers => {
      const mother = people.find(person => person.name === pers.motherName);
      const father = people.find(person => person.name === pers.fatherName);

      return {
        ...pers,
        mother,
        father,
      };
    });
  }
};

export default extendPeopleData;
