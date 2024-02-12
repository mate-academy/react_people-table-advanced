import { PersonLink } from '../components/PersonLink';
import { Person } from '../types/Person';

export const getParent = (people: Person[], parentName: string | null) => {
  const parent = people.find(person => person.name === parentName);

  if (parent) {
    return <PersonLink person={parent} />;
  }

  return parentName || '-';
};
