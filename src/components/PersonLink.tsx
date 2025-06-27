import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person as PersonType, Sex } from '../types';
import { getSearchWith } from '../utils/searchHelper';

interface PersonLinkProps {
  person: PersonType;
}

export const PersonLink: React.FC<PersonLinkProps> = ({ person }) => {
  const { name, sex, slug } = person;
  const [searchParams] = useSearchParams();

  const LinkTo = {
    pathname: `/people/${slug}`,
    search: getSearchWith(searchParams, {}),
  };

  const linkClasses = cn({ 'has-text-danger': sex === Sex.Female });

  return (
    <Link to={LinkTo} className={linkClasses}>
      {name}
    </Link>
  );
};
