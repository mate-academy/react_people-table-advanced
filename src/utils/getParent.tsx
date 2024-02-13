import { PersonLink } from '../components/PersonLink';
import { Person } from '../types';

export const getParent = (parentName: string | null, parent?: Person) => {
  if (parent) {
    return <PersonLink person={parent} />;
  }

  if (parentName) {
    return parentName;
  }

  return '-';
};
