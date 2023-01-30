import { FC } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  parent?: Person;
};

export const ParentItem: FC<Props> = ({ parent }) => (
  <td>
    {parent ? (
      <Link
        to={`${parent.slug}`}
        className={cn({
          'has-text-danger': parent.sex === 'f',
        })}
      >
        {parent.name}
      </Link>
    ) : (
      '-'
    )}
  </td>
);
