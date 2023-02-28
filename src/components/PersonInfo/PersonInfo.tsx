import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  personsFather: Person | null;
  personsMother: Person | null;
  selectedSlug: string;
};

export const PersonInfo: React.FC<Props> = ({
  person,
  personsFather,
  personsMother,
  selectedSlug,
}) => {
  const {
    sex,
    born,
    died,
    slug,
  } = person;
  const motherName = person.motherName || '-';
  const fatherName = person.fatherName || '-';
  const isSelected = selectedSlug === slug;

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': isSelected },
      )}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {personsMother
          ? <PersonLink person={personsMother} />
          : motherName}
      </td>
      <td>
        {personsFather
          ? <PersonLink person={personsFather} />
          : fatherName}
      </td>
    </tr>
  );
};
