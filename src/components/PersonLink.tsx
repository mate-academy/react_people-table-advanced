import cn from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
};
export const PersonLink:React.FC<Props> = React.memo(({ person }) => {
  const { personSlug } = useParams();

  const linkTo = person.slug === personSlug
    ? '/people'
    : `/people/${person.slug}`;

  return (
    <Link
      to={linkTo}
      className={cn(
        { 'has-text-danger': person.sex === 'f' },
      )}
    >
      {person.name}
    </Link>
  );
});
