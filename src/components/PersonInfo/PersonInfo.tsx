import cn from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';
import { NOT_PARENTS_NAME } from '../../variables';

type Props = {
  person: Person
};

export const PersonInfo: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    father,
    mother,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === slug,
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
          motherName || NOT_PARENTS_NAME
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || NOT_PARENTS_NAME
        )}
      </td>
    </tr>
  );
};
