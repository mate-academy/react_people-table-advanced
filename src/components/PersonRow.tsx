import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

export const PersonRow: React.FC<{ person: Person }> = ({ person }) => {
  const { personSlug } = useParams();
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': slug === personSlug },
      )}
    >
      <td aria-label="Link">
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || '-'}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
};
