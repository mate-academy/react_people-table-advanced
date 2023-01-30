import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  parent?: Person;
};

export const ParentItem: FC<Props> = ({ parent }) => (
  <td>
    {parent ? (
      <a
        href={`#/people/${parent.slug}`}
        className={cn({
          'has-text-danger': parent.sex === 'f',
        })}
      >
        {parent.name}
      </a>
    ) : (
      '-'
    )}
  </td>
);
