import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

import '../App.scss';
import { Person } from '../types';

type Props = {
  personName: string,
  people: Person[],
};

export const PersonLink: React.FC<Props> = ({ personName, people }) => {
  const findPerson = people.find(human => human.name === personName);

  return (
    findPerson ? (
      <Link
        to={`/people/${findPerson.slug}`}
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
