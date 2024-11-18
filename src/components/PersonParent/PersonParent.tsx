import { FC } from 'react';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  parent: Person | undefined;
  parentName: string | null;
}

export const PersonParent: FC<Props> = ({ parent, parentName }) => {
  const name = parentName ? parentName : '-';

  return <>{parent ? <PersonLink person={parent} /> : name}</>;
};
