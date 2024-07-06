import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import { Sex } from '../../types/Sex';
import { PeopleContext } from '../../PeopleContext';

type Props = {
  person: Person;
  mother: Person | undefined;
  father: Person | undefined;
};

export const PeopleItem: React.FC<Props> = ({ person, mother, father }) => {
  const { setCurrent } = useContext(PeopleContext);
  const [searchParams] = useSearchParams();

  const { slug } = useParams();

  const motherInfo =
    person.motherName && mother ? (
      <Link
        to={{
          pathname: `/people/${mother.slug}`,
          search: searchParams.toString(),
        }}
        onClick={() => setCurrent(mother)}
        className="has-text-danger"
      >
        {person.motherName}
      </Link>
    ) : (
      person.motherName
    );
  const fatherInfo =
    person.fatherName && father ? (
      <Link
        to={{
          pathname: `/people/${father.slug}`,
          search: searchParams.toString(),
        }}
        onClick={() => setCurrent(father)}
      >
        {person.fatherName}
      </Link>
    ) : (
      person.fatherName
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
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({
            'has-text-danger': person.sex === Sex.Female,
          })}
          onClick={() => setCurrent(person)}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{motherInfo || '-'}</td>
      <td>{fatherInfo || '-'}</td>
    </tr>
  );
};
