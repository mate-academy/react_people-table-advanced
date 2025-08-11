import React from 'react';
import { Person } from '../types';
import { Link, useParams, useSearchParams } from 'react-router-dom';

type Props = {
  person: Person;
};
const PersonItem: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={{
            pathname: `${person.slug}`,
            search: searchParams.toString(),
          }}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link to={person.mother.slug} className="has-text-danger">
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {person.father ? (
          <Link to={person.father.slug}>{person.father.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};

export default PersonItem;
