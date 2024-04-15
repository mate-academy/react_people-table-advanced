import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
}

const MINUS = '-';

export const PersonRow: React.FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, mother, father } = person;
  const { personId } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': personId === person.slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || MINUS}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || MINUS}</td>
    </tr>
  );
};
