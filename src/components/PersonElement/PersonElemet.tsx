import classNames from 'classnames';
import { Person } from '../../types';
import { EMPTY_VALUE } from '../../utils/constants';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  selectedPerson: string;
};

export const PersonElement: React.FC<Props> = ({ person, selectedPerson }) => {
  const {
    sex,
    born,
    died,
    slug,
    mother,
    motherName,
    father,
    fatherName,
  } = person;

  return (
    <tr
      data-cy="person"
      className={
        classNames({ 'has-background-warning': selectedPerson === slug })
      }
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {mother
          ? (
            <PersonLink person={mother} />
          )
          : (
            motherName || EMPTY_VALUE
          )}
      </td>
      <td>
        {father
          ? (
            <PersonLink person={father} />
          )
          : (
            fatherName || EMPTY_VALUE
          )}
      </td>
    </tr>
  );
};
