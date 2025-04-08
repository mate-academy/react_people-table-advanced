import { FC, memo } from 'react';
import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
  isHighlighted: boolean;
}

export const PersonRow: FC<Props> = memo(({ person, isHighlighted }) => {
  const { sex, born, died, motherName, fatherName } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isHighlighted })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      {person.mother ? (
        <td>
          <PersonLink person={person.mother} />
        </td>
      ) : (
        <td>{motherName || '-'}</td>
      )}
      {person.father ? (
        <td>
          <PersonLink person={person.father} />
        </td>
      ) : (
        <td>{fatherName || '-'}</td>
      )}
    </tr>
  );
});

PersonRow.displayName = 'PersonRow';
