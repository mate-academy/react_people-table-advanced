import classNames from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types';

type PLink = {
  person: Person,
  people: Person[],
};

export const PeopleLink: React.FC<PLink> = ({
  person,
  people,
}) => {
  const { personSlug } = useParams();
  const [searchParams] = useSearchParams();

  const motherName = people.find(
    mother => person.motherName === mother.name,
  );

  const fatherName = people.find(
    father => person.fatherName === father.name,
  );

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personSlug === person.slug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
          to={{
            pathname: `/people/${person.slug}`,
            search: searchParams.toString(),
          }}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {motherName ? (
          <Link
            className="has-text-danger"
            to={{
              pathname: `/people/${motherName.slug || ''}`,
              search: searchParams.toString(),
            }}
          >
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {fatherName ? (
          <Link
            to={{
              pathname: `/people/${fatherName.slug || ''}`,
              search: searchParams.toString(),
            }}
          >
            {person.fatherName}
          </Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
