import { Person } from '../../../types';
import { PersonLink } from '../PersonLink';
import classNames from 'classnames';

interface Props {
  person: Person;
  isActive: boolean;
}

export const PersonItem: React.FC<Props> = ({ person, isActive }) => {
  const parentRender = (
    parent: Person | undefined,
    parentName: string | null,
  ) => {
    if (parent) {
      return <PersonLink person={parent} />;
    }

    if (parentName) {
      return parentName;
    }

    return '-';
  };

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
      <td>{parentRender(person.mother, person.motherName)}</td>
      <td>{parentRender(person.father, person.fatherName)}</td>
    </tr>
  );
};
