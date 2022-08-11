const linkPersonWithParents = (person: Person, peopleArray: Person[]) => {
  const mother = peopleArray.find(possibleParent => (
    possibleParent.name === person.motherName
  ));
  const father = peopleArray.find(possibleParent => (
    possibleParent.name === person.fatherName
  ));

  return {
    ...person,
    mother: mother || null,
    father: father || null,
  };
};

export default linkPersonWithParents;
