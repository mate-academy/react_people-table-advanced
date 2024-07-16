import classNames from 'classnames';
import { Person } from '../types';
import { Link, useLocation, useParams } from 'react-router-dom';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const { search } = useLocation();
  const { name, sex, born, died, mother, father, fatherName, motherName } =
    person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`${person.slug}` + `${search}`}
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
            className="has-text-danger"
            to={`/people/${mother.slug}` + `${search}`}
          >
            {mother.name}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father.slug}` + `${search}`}>{father.name}</Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
