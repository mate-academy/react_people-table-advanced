import { FC } from 'react';
import cn from 'classnames';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';
import { usePeopleRouting } from '../../hooks/usePeopleRouting';

interface Props {
  person: Person;
}

export const PersonItem: FC<Props> = ({ person }) => {
  const { slug, sex, born, died, motherName, fatherName, mother, father } =
    person;

  const { personId } = usePeopleRouting();

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': personId === slug })}
    >
      <td>
        <PersonLink person={person} />
      </td>
      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName}</td>
    </tr>
  );
};
