import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useValues } from './store/PeopleContext';

type Props = {
  person: Person;
};

const NO_INFO = '-';
const FEMALE = 'f';

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName, slug } = person;
  const { people } = useValues();
  const { slug: slugName } = useParams();
  const [searchParams] = useSearchParams();

  const mother = people.find(p => p.name === motherName);
  const father = people.find(p => p.name === fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slugName === slug })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={cn({ 'has-text-danger': sex === FEMALE })}
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
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
            className="has-text-danger"
          >
            {motherName || NO_INFO}
          </Link>
        ) : (
          <p>{motherName || NO_INFO}</p>
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {fatherName || NO_INFO}
          </Link>
        ) : (
          <p>{fatherName || NO_INFO}</p>
        )}
      </td>
    </tr>
  );
};
