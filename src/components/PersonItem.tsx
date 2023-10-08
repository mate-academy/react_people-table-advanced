import cn from 'classnames';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';
import { NOT_SET_VALUE } from '../utils/constants';

type Props = {
  person: Person,
  isSelected?: boolean,
};

export const PersonItem: React.FC<Props> = ({
  person,
  isSelected = false,

}) => {
  const {
    sex,
    born,
    died,
    motherName,
    fatherName,
    mother,
    father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn(
        { 'has-background-warning': isSelected },
      )}
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
          motherName || NOT_SET_VALUE
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || NOT_SET_VALUE
        )}
      </td>
    </tr>
  );
};
