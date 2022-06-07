/// <reference types="react-scripts" />

interface Person {
  name: string,
  sex: string,
  born: number,
  died: number,
  fatherName: string,
  motherName: string,
  slug: string,
}

type ContextType = {
  people: Person[],
  setPeople: (people: Person[]) => void,
  visiblePeople: Person[],
  setVisiblePeople: (people: Person[]) => void,
};
