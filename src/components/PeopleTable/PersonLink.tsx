import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  const {
    slug,
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  return (
    <tr
      className={`some-class ${slug === personSlug ? 'has-background-warning' : ''}`}
      data-cy="person"
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={`${sex === 'f' ? 'has-text-danger' : ''}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{fatherName}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
