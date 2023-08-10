import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  user: Person;
};

export const PersonLink:React.FC<Props> = ({ user }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': user.slug === slug })}
    >
      <td>
        <Link
          to={`/people/${user.slug}`}
          className={classNames({
            'has-text-danger': user.sex === 'f',
          })}
        >
          {user.name}
        </Link>
      </td>

      <td>{user.sex}</td>
      <td>{user.born}</td>
      <td>{user.died}</td>
      {user.mother ? (
        <td>
          <Link
            to={`/people/${user.mother.slug}`}
            className={classNames({ 'has-text-danger': user.motherName })}
          >
            {user.motherName || '-'}
          </Link>
        </td>
      ) : (
        <td>
          {user.motherName || '-'}
        </td>
      )}

      {user.father ? (
        <td>
          <Link
            to={`/people/${user.father.slug}`}
          >
            {user.fatherName ? user.fatherName : '-'}
          </Link>
        </td>
      ) : (
        <td>
          {user.fatherName ? user.fatherName : '-'}
        </td>
      )}
    </tr>
  );
};
