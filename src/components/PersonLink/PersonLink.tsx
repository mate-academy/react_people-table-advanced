import cn from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../../types';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const {
    name,
    born,
    died,
    fatherName,
    father,
    motherName,
    mother,
    sex,
    slug,
  } = person;

  const { personSlug } = useParams();

  const isPersonSelected = personSlug === slug;

  const isWomen = sex === 'f';

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isPersonSelected })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': isWomen })}
          to={`../${slug}`}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      { mother && (
        <td>
          <Link
            className="has-text-danger"
            to={`../${mother.slug}`}
          >
            {mother.name}
          </Link>
        </td>
      )}

      { !mother && motherName && (
        <td>{motherName}</td>
      )}

      { !mother && !motherName && (
        <td>-</td>
      )}

      { father && (
        <td>
          <Link
            to={`../${father.slug}`}
          >
            {father.name}
          </Link>
        </td>
      )}

      { !father && fatherName && (
        <td>{fatherName}</td>
      )}

      { !father && !fatherName && (
        <td>-</td>
      )}
    </tr>
  );
};
