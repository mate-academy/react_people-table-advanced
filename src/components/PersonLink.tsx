import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  user: Person;
};

export const PersonLink:React.FC<Props> = ({ user }) => {
  const { slug } = useParams();

  const {
    slug: userSlug,
    sex,
    name,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = user;

  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': userSlug === slug })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
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
      {mother ? (
        <td>
          <Link
            to={`/people/${mother.slug}`}
            className={classNames({ 'has-text-danger': motherName })}
          >
            {motherName || '-'}
          </Link>
        </td>
      ) : (
        <td>
          {motherName || '-'}
        </td>
      )}

      {father ? (
        <td>
          <Link
            to={`/people/${father.slug}`}
          >
            {fatherName || '-'}
          </Link>
        </td>
      ) : (
        <td>
          {fatherName || '-'}
        </td>
      )}
    </tr>
  );
};
