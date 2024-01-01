import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { FC } from 'react';
import { Person } from '../../types';
import { Sex } from '../../types/Sex';

interface Props {
  person: Person,
}

export const PersonLink: FC<Props> = ({ person }) => {
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

  const { selectedPerson } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPerson === slug,
      })}
    >
      <td>
        <Link
          to={`../${slug}`}
          className={cn(
            { 'has-text-danger': sex === Sex.FEMALE },
          )}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother ? (
        <td>
          <Link to={`../${mother.slug}`} className="has-text-danger">
            {motherName}
          </Link>
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`../${father.slug}`}>
            {fatherName}
          </Link>
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
};
