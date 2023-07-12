import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  parent: Person | null | undefined;
  name: string | null;
};

export const ParentInfo: FC<Props> = ({ parent, name }) => {
  const location = useLocation();

  return (
    <>
      {parent ? (
        <Link
          to={{
            pathname: `/people/${parent.slug}`,
            search: location.search,
          }}
          className={classNames('', {
            'has-text-info': parent.sex === 'm',
            'has-text-danger': parent.sex === 'f',
          })}
        >
          {parent.name || '-'}
        </Link>
      ) : (
        <p>{name || '-'}</p>
      )}
    </>
  );
};
