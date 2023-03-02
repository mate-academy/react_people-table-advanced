import classNames from 'classnames';
import React from 'react';

import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person,
  selectedPersonSlug: string,
  mother: Person | null,
  father: Person | null,
};

export const TablePerson: React.FC<Props> = React.memo(
  ({
    person,
    selectedPersonSlug,
    mother,
    father,
  }) => {
    const isSelected = person.slug === selectedPersonSlug;
    const personMotherName = person.motherName || '-';
    const personFatherName = person.fatherName || '-';

    const personMather
      = mother
        ? <PersonLink person={mother} />
        : personMotherName;

    const personFather
      = father
        ? <PersonLink person={father} />
        : personFatherName;

    return (
      <tr
        data-cy="person"
        className={classNames({ 'has-background-warning': isSelected })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{person.sex}</td>
        <td>{person.born}</td>
        <td>{person.died}</td>
        <td>{personMather}</td>
        <td>{personFather}</td>
      </tr>
    );
  },
);
