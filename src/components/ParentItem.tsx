import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  parent: Person | undefined;
  name: string | null;
};

export const ParentItem: React.FC<Props> = ({ parent, name }) => {
  if (!name) {
    return '-';
  }

  if (!parent) {
    return name;
  }

  return <PersonLink person={parent} />;
};
