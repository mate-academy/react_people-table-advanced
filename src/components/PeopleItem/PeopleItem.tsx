import classNames from 'classnames';
import type { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import type { PeopleItemType } from '../../types/PeopleItemType';

export const PeopleItem = ({
  person,
  people,
  warning,
  onWarning,
}: PeopleItemType) => {
  const findPersonByName = (name?: string | null): Person | undefined => {
    if (!name) {
      return undefined;
    }

    return people.find(p => p.name === name);
  };

  const motherPerson = findPersonByName(person.motherName);
  const fatherPerson = findPersonByName(person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': warning === person.slug,
      })}
      onClick={() => onWarning(person.slug)}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>

      <td>{person.born}</td>

      <td>{person.died}</td>

      <td>
        {motherPerson ? (
          <PersonLink person={motherPerson} />
        ) : person.motherName ? (
          <span className="has-text-danger">{person.motherName}</span>
        ) : (
          '-'
        )}
      </td>

      <td>
        {fatherPerson ? (
          <PersonLink person={fatherPerson} />
        ) : person.fatherName ? (
          <span>{person.fatherName}</span>
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
