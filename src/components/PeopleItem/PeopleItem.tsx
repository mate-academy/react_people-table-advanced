import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types/Person';

type Props = {
  person: Person,
};

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const [searchParams] = useSearchParams();

  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    slug,
    father,
    mother,
  } = person;

  const { userId } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === userId,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
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
        {mother ? (
          <Link
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (
          `${motherName || '-'}`
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
            {fatherName || '-'}
          </Link>
        ) : (
          `${fatherName || '-'}`
        )}
      </td>
    </tr>
  );
};
