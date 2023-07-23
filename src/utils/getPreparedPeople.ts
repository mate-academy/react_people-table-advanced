import { Person } from '../types';

enum Parent {
  Mother = 'motherName',
  Father = 'fatherName',
}

const getPersonParent = (people: Person[], person: Person, parent: Parent) => {
  const personParent = people.find(searchedParent => (
    searchedParent.name === person[parent]
  )) || null;

  return personParent;
};

export const getPreparePeople = (people: Person[]) => {
  const preparedPeople = people.map(person => {
    const personMother = getPersonParent(people, person, Parent.Mother);
    const personFather = getPersonParent(people, person, Parent.Father);

    return {
      ...person,
      mother: personMother,
      father: personFather,
    };
  });

  return preparedPeople;
};
