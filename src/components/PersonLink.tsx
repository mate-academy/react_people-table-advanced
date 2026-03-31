import cn from 'classnames';
import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { usePeople } from '../store/PeopleContext';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { people } = usePeople();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const mother = people.find((p: Person) => p.name === person.motherName);
  const father = people.find((p: Person) => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': person.slug === slug })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={`/people/${searchParams.toString() ? `${person.slug}?${searchParams.toString()}` : person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link
            className="has-text-danger"
            to={`/people/${searchParams.toString() ? `${mother.slug}?${searchParams.toString()}` : mother.slug}`}
          >
            {mother?.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={`/people/${searchParams.toString() ? `${father.slug}?${searchParams.toString()}` : father.slug}`}
          >
            {father?.name}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
