import classNames from 'classnames';

import React from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  human: Person;
};

export const PeopleTableRow: React.FC<Props> = ({ human }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': human.slug === slug })}
    >
      <td>
        <PersonLink human={human} />
      </td>
      <td>{human.sex}</td>
      <td>{human.born}</td>
      <td>{human.died}</td>
      <td>
        {human.mother ? (
          <PersonLink human={human.mother} />
        ) : (
          human.motherName || '-'
        )}
      </td>
      <td>
        {human.father ? (
          <PersonLink human={human.father} />
        ) : (
          human.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
