import classNames from 'classnames';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

interface Props {
  sex: string,
  name: string,
  slug: string,
}

export const PersonLink: React.FC<Props> = ({
  name,
  sex,
  slug,
}) => {
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
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
