import classNames from 'classnames';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
};

export const PeopleLink: React.FC<Props> = ({ person }) => {
  const { name, sex, born, died, motherName, fatherName, mother, father } =
    person;
  const { slug } = useParams();
  const noParent = '-';
  const location = useLocation();

  const preserveQueryParams = (to: string): string => {
    return `${to}${location.search}`;
  };

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': slug === person.slug })}
    >
      <td>
        <Link
          to={preserveQueryParams(`${person.slug}`)}
          className={classNames({ 'has-text-danger': sex === 'f' })}
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
            to={preserveQueryParams(`${mother.slug}`)}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : (
          motherName || noParent
        )}
      </td>
      <td>
        {father ? (
          <Link to={preserveQueryParams(`${father.slug}`)}>{father.name}</Link>
        ) : (
          fatherName || noParent
        )}
      </td>
    </tr>
  );
};
