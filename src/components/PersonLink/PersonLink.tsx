import React from 'react';
import classNames from 'classnames';
import { Link, useResolvedPath, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const { slug, name, sex } = person;
  const { pathname } = useResolvedPath(`../${slug}`);
  const search = searchParams.toString();

  return (
    <Link
      to={{
        pathname,
        search,
      }}
      className={classNames({
        'has-text-danger': sex === 'f',
      })}
    >
      {name}
    </Link>
  );
};
