import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Person } from '../types';
import { mainURL } from './globalVariables';

export const PeopleTable: React.FC<{
  person: Person;
  selectedTodoId: string;
  visiblePeople: Person[];
}> = ({ person, selectedTodoId, visiblePeople }) => {
  const {
    name,
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
  }
    = person;

  const linkParents = (selectedParrents: string | null) => {
    const findedParents = selectedParrents && visiblePeople.find(
      (people) => people.name === selectedParrents,
    );

    if (findedParents) {
      return (
        <Link
          to={`/${mainURL}/people/${findedParents.slug}`}
          className={classNames({
            'has-text-danger': findedParents.sex === 'f',
          })}
        >
          {selectedParrents}
        </Link>
      );
    }

    return selectedParrents || ' - ';
  };

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedTodoId === slug,
      })}
    >
      <td>
        <Link
          to={`/${mainURL}/people/${slug}`}
          className={classNames({
            'has-text-danger': sex === 'f',
          })}
        >
          {name}
        </Link>
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{linkParents(motherName)}</td>
      <td>{linkParents(fatherName)}</td>
    </tr>
  );
};
