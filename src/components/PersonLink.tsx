import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';

interface Props {
  person: Person;
  activeSlug: string | undefined;
  search: string;
}

export const PersonLink: React.FC<Props> = ({
  person: {
    slug,
    sex,
    name,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  },
  activeSlug,
  search,
}) => {
  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': activeSlug === slug })}
    >
      <td>
        <Link
          to={{ pathname: `/people/${slug}`, search }}
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
            to={{ pathname: `/people/${mother.slug}`, search }}
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
          <Link to={{ pathname: `/people/${father.slug}`, search }}>
            {fatherName}
          </Link>
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
