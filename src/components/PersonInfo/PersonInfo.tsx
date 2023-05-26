import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

interface Props {
  person: Person;
  isSelected: boolean
}

export const PersonInfo: React.FC<Props> = ({ person, isSelected }) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>
        {sex}
      </td>

      <td>
        {born}
      </td>

      <td>
        {died}
      </td>

      <td>
        {mother
          ? (<PersonLink person={mother} />)
          : (motherName || '-')}
      </td>

      <td>
        {father
          ? (<PersonLink person={father} />)
          : (fatherName || '-')}
      </td>
    </tr>
  );
};
