import cn from 'classnames';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person
}

enum PersonSex {
  Male = 'm',
  Female = 'f',
}

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug,
  } = person;

  const [searchParams] = useSearchParams();
  const { slug: selectedPerson } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === selectedPerson })}
    >
      <td>
        <Link
          to={{
            pathname: `/people/${slug}`,
            search: searchParams.toString(),
          }}
          className={cn(
            { 'has-text-danger': sex === PersonSex.Female },
          )}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother
        ? (
          <td>
            <Link
              to={{
                pathname: `/people/${mother.slug}`,
                search: searchParams.toString(),
              }}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          </td>
        )
        : (
          <td>{motherName || '-'}</td>
        )}

      {father
        ? (
          <td>
            <Link
              to={{
                pathname: `/people/${father.slug}`,
                search: searchParams.toString(),
              }}
            >
              {fatherName}
            </Link>
          </td>
        )
        : (
          <td>{fatherName || '-'}</td>
        )}
    </tr>
  );
};
