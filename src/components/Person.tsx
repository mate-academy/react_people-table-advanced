import { FC } from 'react';
import { Person } from '../types';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  person: Person;
};
export const PersonLink: FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const mom = person.motherName ? person.motherName : '-';

  const dad = person.fatherName ? person.fatherName : '-';

  const mother = person.mother ? (
    <Link
      to={{
        pathname: `/people/${person.mother.slug}`,
        search: searchParams.toString(),
      }}
      className="has-text-danger"
    >
      {person.mother.name}
    </Link>
  ) : (
    mom
  );

  const father = person.father ? (
    <Link
      to={{
        pathname: `/people/${person.father.slug}`,
        search: searchParams.toString(),
      }}
    >
      {person.father.name}
    </Link>
  ) : (
    dad
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': pathname === `/people/${person.slug}`,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
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
      <td>{mother}</td>
      <td>{father}</td>
    </tr>
  );
};
