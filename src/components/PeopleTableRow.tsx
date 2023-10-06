import { memo } from 'react';
import classNames from 'classnames';
import { EMPTY_VALUE } from '../utils/constants';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  selectedPersonSlug?: string;
};

export const PeopleTableRow: React.FC<Props> = memo(({
  person,
  selectedPersonSlug,
}) => {
  const {
    slug,
    sex,
    born,
    died,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': slug === selectedPersonSlug,
      })}
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
          : motherName ?? EMPTY_VALUE}
      </td>

      <td>
        {father
          ? <PersonLink person={father} />
          : fatherName ?? EMPTY_VALUE}
      </td>
    </tr>
  );
});
