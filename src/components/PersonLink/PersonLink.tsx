import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug: currentSlug } = useParams();
  const [searchParams] = useSearchParams();
  const {
    name,
    slug,
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === currentSlug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={sex === 'f' ? 'has-text-danger' : ''}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother ? (
        <td>
          <Link
            className={mother.sex === 'f' ? 'has-text-danger' : ''}
            to={{
              pathname: `/people/${mother?.slug}?`,
              search: searchParams.toString(),
            }}
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName ? motherName : '-'}</td>
      )}

      {father ? (
        <td>
          <Link
            to={{
              pathname: `/people/${father?.slug}?`,
              search: searchParams.toString(),
            }}
          >
            {fatherName}
          </Link>
        </td>
      ) : (
        <td>{fatherName ? fatherName : '-'}</td>
      )}
    </tr>
  );
};
