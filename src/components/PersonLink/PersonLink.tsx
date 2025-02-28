import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types/Person';
import { Link, useSearchParams } from 'react-router-dom';
import { Gender } from '../../types/Gender';

interface PersonLinkProps {
  person: Person;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { sex, name, slug } = person;
  const [searchParams] = useSearchParams();

  return (
    <Link
      to={{
        pathname: `/people/${slug}`,
        search: searchParams.toString(),
      }}
      className={classNames({ 'has-text-danger': sex === Gender.Female })}
    >
      {name}
    </Link>
  );
};
