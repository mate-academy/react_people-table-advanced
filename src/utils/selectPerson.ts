import { SetStateAction } from 'react';
import { Person } from '../types';

export function selectPerson(
  people: Person[],
  setSelectedPerson: React.Dispatch<SetStateAction<Person | null>>,
  currentParent: Person,
) {
  const selectedParent = people.find(p => p.name === currentParent.name);

  if (selectedParent) {
    setSelectedPerson(selectedParent);
  }
}
