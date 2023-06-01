import { FC, memo } from 'react';
import cn from 'classnames';
import {
  Link,
  useLocation,
  useResolvedPath,
} from 'react-router-dom';
import { Person } from '../../types';

interface Props {
  person: Person;
  selectedPerson: string;
}

export const PersonLink: FC<Props> = memo(({ person, selectedPerson }) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': slug === selectedPerson })}
    >
      <td>
        <Link
          to={{
            pathname: parentPath + slug,
            search: location.search,
          }}
          className={cn({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {
        mother ? (
          <td>
            <Link
              to={{
                pathname: parentPath + mother.slug,
                search: location.search,
              }}
              className="has-text-danger"
            >
              {motherName}
            </Link>
          </td>
        )
          : (
            <td>{motherName || '-'}</td>
          )
      }

      {
        father ? (
          <td>
            <Link
              to={{
                pathname: parentPath + father.slug,
                search: location.search,
              }}
            >
              {fatherName}
            </Link>
          </td>
        )
          : (
            <td>{fatherName || '-'}</td>
          )
      }
    </tr>
  );
});
