import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { name, fatherName, motherName, sex, born, died, slug } = person;
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const isMother = people.find(p => p.name === motherName);
  const isFather = people.find(p => p.name === fatherName);
  const isActivePerson = personSlug === slug;

  return (
    <tr
      data-cy="person"
      key={personSlug}
      className={classNames({ 'has-background-warning': isActivePerson })}
    >
      <td>
        <Link
          to={{
            pathname: `${slug}`,
            search: searchParams.toString(),
          }}
          className={classNames({ 'has-text-danger': sex === 'f' })}
        >
          {name}
        </Link>
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {isMother ? (
          <Link
            to={{
              pathname: `${isMother.slug}`,
              search: searchParams.toString(),
            }}
            className={classNames({ 'has-text-danger': isMother.sex === 'f' })}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {isFather ? (
          <Link
            to={{
              pathname: `${isFather.slug}`,
              search: searchParams.toString(),
            }}
          >
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
