import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
  selectedPersonSlug?: string;
};

export const PersonItem = ({ person, selectedPersonSlug }: Props) => {
  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === selectedPersonSlug,
      })}
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
        ) : (
          (person.motherName ?? '-')
        )}
      </td>

      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        ) : (
          (person.fatherName ?? '-')
        )}
      </td>
    </tr>
  );
};
