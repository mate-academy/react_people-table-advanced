import React from 'react';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

export type Props = {
  parent: Person | undefined,
  parentName: string | null,
};

export const ExistingParent: React.FC<Props> = ({
  parent, parentName,
}) => (
  <>
    {parent
      ? (
        <PersonLink person={parent} />
      ) : (
        <td>
          {parentName || '-'}
        </td>
      )}
  </>
);
