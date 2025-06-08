import { FC } from 'react';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import { PersonLink } from './';
import cn from 'classnames';

interface Props {
  person: Person;
}

const FEMALE = 'f';
const MISSING_PARENT = '-';

export const PersonInfo: FC<Props> = ({ person }) => {
  const {
    slug,
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;
  const { personSlug } = useParams();
  const selectedUser = personSlug === slug;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={cn({
        'has-background-warning': selectedUser,
      })}
    >
      <td>
        <Link
          to={`../people/${slug}`}
          className={cn({ 'has-text-danger': sex === FEMALE })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? <PersonLink person={mother} /> : motherName || MISSING_PARENT}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : fatherName || MISSING_PARENT}
      </td>
    </tr>
  );
};
