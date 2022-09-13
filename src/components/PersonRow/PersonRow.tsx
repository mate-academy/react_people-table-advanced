import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type TProps = {
  person: Person;
};

export const PersonRow: React.FC<TProps> = ({ person }) => {
  const {
    slug,
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;
  const { personSlug } = useParams();

  const isActive = personSlug === slug;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': isActive,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || '-'
        )}
      </td>
    </tr>
  );
};
