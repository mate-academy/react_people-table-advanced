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
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
  } = person;

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
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link
            to={`../${mother.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`../${father.slug}`}>
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
