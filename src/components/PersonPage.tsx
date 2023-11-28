import cn from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { NOT_SET_VALUE } from '../utils/constants';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonPage: React.FC<Props> = ({ person, selectedPerson }) => {
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
      className={
        cn({
          'has-background-warning': selectedPerson === slug,
        })
      }
    >
      <td>
        <PersonLink
          person={person}
        />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink person={mother} />
          ) : (
            motherName || NOT_SET_VALUE
          )}
      </td>
      <td>
        {father
          ? (
            <PersonLink person={father} />
          ) : (
            fatherName || NOT_SET_VALUE
          )}
      </td>
    </tr>
  );
};
