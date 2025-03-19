import classNames from 'classnames';

import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
}

export function PersonLink({ person }: PersonLinkProps) {
  const { slug } = useParams();

  const motherName = person.motherName ? (
    person.mother ? (
      <Link to={`./${person.mother.slug}`} className="has-text-danger">
        {person.mother.name}
      </Link>
    ) : (
      person.motherName
    )
  ) : (
    '-'
  );

  const fatherName = person.fatherName ? (
    person.father ? (
      <Link to={`./${person.father.slug}`}>{person.father.name}</Link>
    ) : (
      person.fatherName
    )
  ) : (
    '-'
  );

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={`./${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{motherName}</td>
      <td>{fatherName}</td>
    </tr>
  );
}
