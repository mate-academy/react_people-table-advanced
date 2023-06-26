import { FC } from 'react';
import cn from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

interface Props {
  person: Person;
  selectedPersonSlug: string;
}

export const PeopleTableBody: FC<Props> = ({
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

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': selectedPersonSlug === slug,
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
          : (
            <>
              {motherName
                ? `${motherName}`
                : '-'}
            </>
          )}
      </td>
      <td>
        {father
          ? <PersonLink person={father} />
          : (
            <>
              {fatherName
                ? `${fatherName}`
                : '-'}
            </>
          )}
      </td>
    </tr>
  );
};
