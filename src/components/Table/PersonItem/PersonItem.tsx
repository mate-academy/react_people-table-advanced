import { Person } from '../../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

interface Props {
  person: Person;
  isActive: boolean;
}

export const PersonItem: React.FC<Props> = ({ person, isActive }) => {
  return (
    <tr
      data-cy="person"
      className={classNames({ 'has-background-warning': isActive })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <PersonLink person={person.mother} />
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
