import { FC } from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  parent?: Person;
};

export const ParentItem: FC<Props> = ({ parent }) => {
  const [searchParams] = useSearchParams();

  return (
    <td>
      {parent ? (
        <Link
          to={`/people/${parent.slug}/?${getSearchWith(searchParams, {})}`}
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
};
