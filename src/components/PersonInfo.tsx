import { FC, memo } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
  selectedPerson: string;
}
export const PersonInfo: FC<Props> = memo(({ person, selectedPerson }) => {
  const {
    name,
    sex,
    born,
    died,
    motherName,
    fatherName,
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
          to={slug}
          className={cn({ 'has-text-danger': sex === 'f' })}
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
            className="has-text-danger"
            to={mother.slug}
          >
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={father.slug}>
            {fatherName}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
});
