import classNames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ people, person }) => {
  const { name, sex, born, died, fatherName, motherName } = person;
  const { slug } = useParams();

  const motherNameAsPerson: Person | undefined = people.find(
    man => man.name === motherName,
  );

  const fatherNameAsPerson: Person | undefined = people.find(
    man => man.name === fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {!motherName ? (
        <td>-</td>
      ) : (
        <td>
          {!motherNameAsPerson ? (
            motherName
          ) : (
            <Link
              to={`../${motherNameAsPerson.slug}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          )}
        </td>
      )}

      {!fatherName ? (
        <td>-</td>
      ) : (
        <td>
          {!fatherNameAsPerson ? (
            fatherName
          ) : (
            <Link to={`../${fatherNameAsPerson.slug}`}>{fatherName}</Link>
          )}
        </td>
      )}
    </tr>
  );
};
