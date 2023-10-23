import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';

type Props = {
  person: Person
};

export const PeopleTable: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const [searchParams] = useSearchParams();

  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === personSlug,
      })}
    >
      <td>
        <Link
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
          to={{
            pathname: `../${slug}`,
            search: new URLSearchParams(searchParams).toString(),
          }}
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
            className="has-text-danger"
            to={{
              pathname: `../${mother.slug}`,
              search: new URLSearchParams(searchParams).toString(),
            }}
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link
            to={{
              pathname: `../${father.slug}`,
              search: new URLSearchParams(searchParams).toString(),
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
