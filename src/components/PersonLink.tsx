import { Link } from 'react-router-dom';
import { Person } from '../types';
import React from 'react';
import classNames from 'classnames';

type Props = {
  person: Person;
  activePerson: Person;
};

export const PersonLink: React.FC<Props> = ({ person, activePerson }) => (
  <tr
    data-cy="person"
    className={classNames({
      'has-background-warning':
        activePerson && activePerson?.slug === person.slug,
    })}
  >
    <td>
      <Link
        to={`/people/${person.slug}`}
        className={classNames({ 'has-text-danger': person.sex === 'f' })}
      >
        {person.name}
      </Link>
    </td>
    <td>{person.sex}</td>
    <td>{person.born}</td>
    <td>{person.died}</td>

    <td>
      {person.mother ? (
        <Link to={`/people/${person.mother.slug}`} className="has-text-danger">
          {person.motherName}
        </Link>
      ) : (
        (person.motherName ?? '-')
      )}
    </td>
    <td>
      {person.father ? (
        <Link to={`/people/${person.father.slug}`}>{person.fatherName}</Link>
      ) : (
        (person.fatherName ?? '-')
      )}
    </td>
  </tr>
);
