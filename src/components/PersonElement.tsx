import { Link, useParams } from 'react-router-dom';
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

  return (
    <tr
      data-cy="person"
      className={isPersonSelected ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`../${slug}`}
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
            to={`../${mother.slug}`}
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
          <Link to={`../${father.slug}`}>{father.name}</Link>
        </td>
      ) : (
        <td>{fatherName ?? `-`}</td>
      )}
    </tr>
  );
};
