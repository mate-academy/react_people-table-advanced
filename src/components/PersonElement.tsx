import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';

type PersonElementProps = {
  person: Person;
};

export const PersonElement: React.FC<PersonElementProps> = ({ person }) => {
  const {
    name,
    slug,
    sex,
    born,
    died,
    fatherName,
    motherName,
    father,
    mother,
  } = person;
  const { personSlug } = useParams();
  const isPersonSelected = personSlug === person.slug;
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={isPersonSelected ? 'has-background-warning' : ''}
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
            to={{
              pathname: `/people/${mother.slug}`,
              search: searchParams.toString(),
            }}
            className={mother.sex === 'f' ? 'has-text-danger' : ''}
          >
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{motherName ?? `-`}</td>
      )}

      {father ? (
        <td>
          <Link
            to={{
              pathname: `/people/${father.slug}`,
              search: searchParams.toString(),
            }}
          >
            {father.name}
          </Link>
        </td>
      ) : (
        <td>{fatherName ?? `-`}</td>
      )}
    </tr>
  );
};
