import cN from 'classnames';
import { PersonLink } from './PersonLink';
import { useParams } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  person: Person;
}

export const PeopleTableRow: React.FC<Props> = ({ person }) => {
  const { sex, born, died, mother, father, slug, motherName, fatherName } =
    person;
  const { selectedUserSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cN({
        'has-background-warning': slug === selectedUserSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>

      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
