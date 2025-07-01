import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { Person } from '../../types';
import { father, mother } from './checkParents';

interface PersonItemProps {
  person: Person;
  slugFromParam: Person['slug'] | undefined;
}

export const PersonItem: React.FC<PersonItemProps> = ({
  person,
  slugFromParam,
}) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === slugFromParam,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>{mother(person)}</td>

      <td>{father(person)}</td>
    </tr>
  );
};
