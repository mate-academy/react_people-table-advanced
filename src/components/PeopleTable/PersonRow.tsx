import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { EMPTY } from '../../utils/consts';

interface Props {
  person: Person,
  selectedPersonId: string,
}

export const PersonRow: React.FC<Props> = ({ person, selectedPersonId }) => {
  return (
    <tr
      data-cy="person"
      className={
        classNames({
          'has-background-warning': selectedPersonId === person.slug,
        })
      }
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother
          ? (
            <PersonLink person={person.mother} />
          )
          : (
            person.motherName || EMPTY
          )}
      </td>
      <td>
        {person.father
          ? (
            <PersonLink person={person.father} />
          )
          : (
            person.fatherName || EMPTY
          )}
      </td>
    </tr>
  );
};
