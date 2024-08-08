import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';
import cn from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug: currentSlug } = useParams();
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
          to={`/people/${slug}`}
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
            to={`/people/${mother?.slug}?`}
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName ? motherName : '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`/people/${father.slug}?`}>{fatherName}</Link>
        </td>
      ) : (
        <td>{fatherName ? fatherName : '-'}</td>
      )}
    </tr>
  );
};
