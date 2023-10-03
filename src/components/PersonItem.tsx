import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  selectedSlug: string;
};

const NO_PARENT = '-';

export const PersonItem: React.FC<Props> = ({ person, selectedSlug }) => {
  const {
    born,
    died,
    fatherName,
    motherName,
    sex,
    father,
    mother,
    slug,
  } = person;

  return (
    <tr
      className={
        classNames({ 'has-background-warning': selectedSlug === slug })
      }
      data-cy="person"
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : (
          motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <PersonLink person={father} />
        ) : (
          fatherName || NO_PARENT
        )}
      </td>
    </tr>
  );
};
