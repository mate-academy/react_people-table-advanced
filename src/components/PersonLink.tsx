import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  peopleList: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, peopleList }) => {
  const { slug } = useParams();

  const mother = peopleList.find(mom => mom.name === person.motherName);
  const father = peopleList.find(dad => dad.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>
      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link
            to={`../${mother.slug}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father.slug}`}>
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
