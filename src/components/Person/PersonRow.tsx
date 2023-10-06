import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

type PersonRowProps = {
  person: Person
  clickedPersonSlug?: string
};

export const PersonRow = ({ person, clickedPersonSlug }: PersonRowProps) => {
  const {
    slug,
    sex,
    born,
    died,
    father,
    mother,
    motherName,
    fatherName,
  } = person;

  const motherText = motherName || '-';
  const fatherText = fatherName || '-';

  const rowClass = classNames(
    { 'has-background-warning': slug === clickedPersonSlug },
  );

  return (
    <tr data-cy="person" className={rowClass}>
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink
            person={mother}
          />
        ) : <>{motherText}</>}
      </td>
      <td>
        {father ? (
          <PersonLink
            person={father}
          />
        ) : <>{fatherText}</>}
      </td>
    </tr>
  );
};
