import cn from 'classnames';
import { FC, memo } from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person
  isSelected: boolean
}

export const PersonItem: FC<Props> = memo(({ person, isSelected }) => {
  const {
    sex, born, died, motherName, fatherName, mother, father,
  } = person;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td><PersonLink person={person} /></td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? <PersonLink person={mother} />
          : motherName || '-'}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName || '-'}
      </td>
    </tr>
  );
});
