import { FC } from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface PeopleTableBodyProps {
  person: Person;
  selectedPersonSlug: string;
}

export const PeopleTableBody: FC<PeopleTableBodyProps> = ({
  person,
  selectedPersonSlug,
}) => {
  const {
    sex,
    born,
    died,
    fatherName,
    motherName,
    slug,
    mother,
    father,
  } = person;

  const personRowClasses = classNames({
    'has-background-warning': selectedPersonSlug === slug,
  });

  return (
    <tr
      data-cy="person"
      className={personRowClasses}
    >
      <td>
        <PersonLink person={person} />
      </td>
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
};
