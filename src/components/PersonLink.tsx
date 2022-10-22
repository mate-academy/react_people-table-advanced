import React from 'react';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

import classNames from 'classnames';

import '../App.scss';
import { Person } from '../types';

type Props = {
  personName: string,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  const findPerson = people.find(human => human.name === personName);

  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;

  return (
    findPerson ? (
      <Link
        to={{
          pathname: parentPath + findPerson.slug,
          search: location.search,
        }}
        className={classNames({
          'has-text-danger': findPerson.sex === 'f',
        })}
      >
        {personName}
      </Link>
    ) : (
      <span>
        {personName}
      </span>
    )
  );
};
