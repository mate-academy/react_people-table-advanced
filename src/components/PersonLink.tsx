import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({
  person: { sex, name, slug },
}) => {
  const [searchParams] = useSearchParams();

  return (
    <td>
      <Link
        to={{
          pathname: `/people/${slug}`,
          search: searchParams.toString(),
        }}
        className={cn({
          'has-text-danger': sex === 'f',
        })}
      >
        {name}
      </Link>
    </td>
  );
};
