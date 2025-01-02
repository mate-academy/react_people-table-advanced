import React from 'react';
import cn from 'classnames';

import { PersonLink } from '../PersonLink';
import { Person } from '../../types';

type Props = {
  person: Person;
  selected: Person | undefined;
};

const NO_PARENTS = '-';

export const ItemOfTable: React.FC<Props> = props => {
  const { person, selected } = props;
  const { sex, born, died, fatherName, motherName, slug, mother, father } =
    person;

  return (
    <tr
      key={slug}
      data-cy="person"
      className={cn({
        'has-background-warning': selected?.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      <td>
        {mother ? <PersonLink person={mother} /> : motherName || NO_PARENTS}
      </td>
      <td>
        {father ? <PersonLink person={father} /> : fatherName || NO_PARENTS}
      </td>
    </tr>
  );
};
