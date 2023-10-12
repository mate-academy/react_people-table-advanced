import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';

type TTableItemProps = {
  person: Person;
  people: Person[];
};

enum ESex {
  Female = 'f',
}

export const PersonItem: FC<TTableItemProps> = ({ person, people }) => {
  const {
    name,
    sex,
    born,
    died,
    slug,
    motherName,
    fatherName,
  } = person;

  const { peopleId } = useParams();

  const mother = people
    .find(currentPerson => currentPerson.name === motherName);

  const father = people
    .find(currentPerson => currentPerson.name === fatherName);

  const NOT_SET_VALUE = '-';

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': peopleId === slug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === ESex.Female,
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
            className="has-text-danger"
            to={`/people/${mother?.slug}`}
          >
            {motherName}
          </Link>
        ) : (
          motherName || NOT_SET_VALUE
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={`/people/${father?.slug}`}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName || NOT_SET_VALUE
        )}
      </td>
    </tr>
  );
};
