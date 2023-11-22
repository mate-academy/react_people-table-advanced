import cn from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonComponent: React.FC<Props> = ({ person }) => {
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

  const { personSlug } = useParams();
  const { search } = useLocation();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === personSlug })}
    >
      <td>
        <Link
          to={`${slug + search}`}
          className={cn({ 'has-text-danger': sex === 'f' })}
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
              to={`${mother.slug + search}`}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          </td>
        )
        : <td>{motherName || '-'}</td>}
      {father
        ? <td><Link to={`${father.slug + search}`}>{fatherName}</Link></td>
        : <td>{fatherName || '-'}</td>}
    </tr>
  );
};
