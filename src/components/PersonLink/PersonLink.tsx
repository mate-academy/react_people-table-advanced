import { Link, useSearchParams } from 'react-router-dom';
import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person:Person
};

export const PersonLink:FC<Props> = ({ person: { name, slug, sex } }) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `../${slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
