import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { Sex } from '../types/sex';

interface Props {
  person: Person;
}

const PersonLink: React.FC<Props> = ({ person }) => {
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/people/${person?.slug}`,
        search: location.search,
      }}
      className={classNames({
        'has-text-danger': person?.sex === Sex.Female,
      })}
    >
      {person?.name || '-'}
    </Link>
  );
};

export default PersonLink;
