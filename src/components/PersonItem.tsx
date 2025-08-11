import { FC } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import { Person } from '../types';
import { PersonLink } from './index';

type Props = {
  person: Person;
};

export const PersonItem: FC<Props> = ({ person }) => {
  const { sex, born, died, fatherName, motherName, slug, father, mother } =
    person;

  const { personSlug } = useParams();

  const isSelected = personSlug === slug;

  return (
    <tr
      data-cy="person"
      className={cn({ 'has-background-warning': isSelected })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
      <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
    </tr>
  );
};
