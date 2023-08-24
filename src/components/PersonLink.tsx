import classNames from 'classnames';
import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ person }) => {
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
  const { userSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === userSlug,
      })}
    >
      <td>
        <Link
          to={`/people/${slug}`}
          className={classNames(
            { 'has-text-danger': sex === 'f' },
          )}
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
            to={`/people/${mother.slug}`}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (motherName || '-')}
      </td>
      <td>
        {father ? (
          <Link
            to={`/people/${father.slug}`}
          >
            {fatherName}
          </Link>
        ) : (fatherName || '-')}
      </td>
    </tr>
  );
};
