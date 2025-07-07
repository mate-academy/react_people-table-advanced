import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';
import { Person } from '../types/Person';

type Props = {
  person: Person;
};

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { personId } = useParams();
  const { born, died, fatherName, motherName, sex, mother, father, slug } =
    person;

  return (
    <tr
      data-cy="person"
      className={personId === slug ? 'has-background-warning' : ''}
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
