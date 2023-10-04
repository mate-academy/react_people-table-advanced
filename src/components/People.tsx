import classNames from 'classnames';
import { Person } from '../types';
import { EMPTY_VALUE } from '../utils/constants';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const People: React.FC<Props> = ({ person, selectedPerson }) => {
  const {
    sex,
    born,
    died,
    mother,
    father,
    motherName,
    fatherName,
    slug,
  } = person;

  return (
    <tr
      data-cy="person"
      key={slug}
      className={
        classNames({ 'has-background-warning': selectedPerson === slug })
      }
    >
      <PersonLink person={person} />

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>

      {mother
        ? (
          <PersonLink person={mother} />
        ) : (
          <td>
            {motherName || EMPTY_VALUE}
          </td>
        )}
      {father
        ? (
          <PersonLink person={father} />
        ) : (
          <td>
            {fatherName || EMPTY_VALUE}
          </td>
        )}
    </tr>
  );
};
