import { Link, useParams, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
import { Sex } from '../enums/Sex';

interface Props {
  person: Person;
}
export const PersonLink: React.FC<Props> = ({ person }) => {
  const { slug } = useParams();
  const location = useLocation();
  const { name, sex, born, died, mother, motherName, father, fatherName } =
    person;
  const locSearch = `/people/${person.slug}${location.search}`;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={`${locSearch}`}
          className={cn({
            'has-text-danger': sex === Sex.female,
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
            to={`/people/${mother.slug}${location.search}`}
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
          <Link to={`/people/${father.slug}${location.search}`}>
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
