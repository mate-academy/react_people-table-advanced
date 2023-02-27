import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person;
  selectedPerson: string;
  mother: Person | null;
  father: Person | null;
};

export const PersonLink: React.FC<Props> = ({
  person,
  selectedPerson,
  mother,
  father,
}) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPerson,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
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
        {mother
          ? (
            <Link
              to={`/people/${mother.slug}`}
              className={classNames({
                'has-text-danger': mother.sex === 'f',
              })}
            >
              {mother.name}
            </Link>
          )
          : (motherName || '-')}
      </td>

      <td>
        {father
          ? <Link to={`/people/${father.slug}`}>{father.name}</Link>
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
