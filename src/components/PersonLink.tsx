import { Link, useLocation, useParams } from 'react-router-dom';
import className from 'classnames';
import { Person } from '../types/Person';
import classNames from 'classnames';

type Props = {
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const location = useLocation();
  const currentSearch = location.search;
  const { name, sex, born, died, mother, father, motherName, fatherName } =
    person;

  return (
    <tr
      data-cy="person"
      className={className({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={`/people/${person.slug}${currentSearch}`}
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
            to={`/people/${mother.slug}${currentSearch}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}${currentSearch}`}>
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
