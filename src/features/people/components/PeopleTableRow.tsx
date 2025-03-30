import { Person } from '../../../types';
import { PersonLink } from './PersonLink';
import cn from 'classnames';

interface Props {
  person: Person;
  people: Person[];
  isSelected: boolean;
}

export const PeopleTableRow = ({ person, people, isSelected }: Props) => {
  return (
    <tr
      key={person.slug}
      className={cn({
        'has-background-warning': isSelected,
      })}
      data-cy="person"
    >
      <td>
        <PersonLink name={person.name} people={people} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        <PersonLink name={person.motherName} people={people} />
      </td>
      <td>
        <PersonLink name={person.fatherName} people={people} />
      </td>
    </tr>
  );
};
