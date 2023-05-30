import { FC } from 'react';
import {
  Link,
  useLocation,
  useParams,
  useResolvedPath,
} from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person
};

export const PersonItem: FC<Props> = ({ person }) => {
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

  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
      })}
    >
      <td>
        <Link
          to={{
            pathname: parentPath + slug,
            search: location.search,
          }}
          className={cn({ 'has-text-danger': sex === 'f' })}
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
            to={{
              pathname: parentPath + mother.slug,
              search: location.search,
            }}
            className="has-text-danger"
          >
            {motherName}
          </Link>
        ) : (
          <>
            {motherName || '-'}
          </>
        )}
      </td>

      <td>
        {father ? (
          <Link
            to={{
              pathname: parentPath + father.slug,
              search: location.search,
            }}
          >
            {fatherName}
          </Link>
        ) : (
          <>
            {fatherName || '-'}
          </>
        )}
      </td>
    </tr>
  );
};
