import classNames from 'classnames';
import { Person } from '../../types';
import { EMPTY_VALUE } from '../../utils/constants';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonElement: React.FC<Props> = ({ person, selectedPerson }) => {
  return (
    <tr
      data-cy="person"
      className={
        classNames({ 'has-background-warning': selectedPerson === person.slug })
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
            person.motherName || EMPTY_VALUE
          )}
      </td>
      <td>
        {person.father
          ? (
            <PersonLink person={person.father} />
          )
          : (
            person.fatherName || EMPTY_VALUE
          )}
      </td>
    </tr>
  );
};
