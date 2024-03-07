import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const [searchParam] = useSearchParams();
  const { slugParam } = useParams();

  const { name, sex, born, died, fatherName, motherName, slug } = person;

  const isMother = people.find(p => p.name === motherName);
  const isFather = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === slugParam,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParam.toString(),
          }}
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
        {isMother ? (
          <Link
            to={{
              pathname: `/people/${isMother.slug}`,
              search: searchParam.toString(),
            }}
            className={classNames({
              'has-text-danger': isMother.sex === 'f',
            })}
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
              pathname: `/people/${isFather.slug}`,
              search: searchParam.toString(),
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
