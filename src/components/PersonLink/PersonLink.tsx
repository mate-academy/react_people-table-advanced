import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type PersonLinkProps = {
  person: Person,
  isSelected: (person: Person) => boolean;
};

export const PersonLink:React.FC<PersonLinkProps> = ({
  person,
  isSelected,
}) => {
  const { name } = person;
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    <Link
      to={{
        pathname: isSelected(person) ? parentPath : person.slug,
        search: location.search,
      }}
      className={classNames({ 'has-text-danger': person.sex === 'f' })}
    >
      {name}
    </Link>
  );
};
