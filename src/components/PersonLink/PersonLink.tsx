import React from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();
  const selectedPerson = slug || '';

  const isMotherName = people.find((woman) => woman.name === person.motherName);
  const isFatherName = people.find((man) => man.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
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
        {isMotherName && (
          <Link
            to={`/people/${isMotherName.slug || 0}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        )}
        {!isMotherName && (person.motherName || '-')}
      </td>
      <td>
        {isFatherName && (
          <Link to={`/people/${isFatherName.slug || 0}`}>
            {person.fatherName}
          </Link>
        )}
        {!isFatherName && (person.fatherName || '-')}
      </td>
    </tr>
  );
};
