import React, { useContext } from 'react';
import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PeopleContext } from '../stores/PeopleContext';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    slug,
    motherName,
    fatherName,
    name,
    sex,
    born,
    died,
  } = person;
  const [searchParams] = useSearchParams();

  const { people } = useContext(PeopleContext);
  const mother = people.find((per) => per.name === motherName);
  const father = people.find((per) => per.name === fatherName);

  return (
    <>
      <td>
        <Link
          className={classNames({ 'has-text-danger': sex === 'f' })}
          to={`/people/${slug}?${searchParams.toString()}`}
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
            to={`/people/${mother?.slug}?${searchParams.toString()}`}
            className={classNames({ 'has-text-danger': mother?.sex === 'f' })}
          >
            {mother?.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={`/people/${father?.slug}?${searchParams.toString()}`}
            className={classNames({ 'has-text-danger': father?.sex === 'f' })}
          >
            {father?.name}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </>
  );
};
