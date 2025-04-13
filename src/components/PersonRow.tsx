import { Person } from '../types';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

interface Props {
  person: Person;
  activePerson: Person | undefined;
}

export const PersonRow = ({ person, activePerson }: Props) => {
  const { sex, born, died, fatherName, motherName, slug, mother, father } =
    person;

  return (
    <>
      <tr
        data-cy="person"
        className={cn({
          'has-background-warning': activePerson?.slug === slug,
        })}
      >
        <td>
          <PersonLink person={person} />
        </td>

        <td>{sex}</td>
        <td>{born}</td>
        <td>{died}</td>
        <td>{mother ? <PersonLink person={mother} /> : motherName || '-'}</td>
        <td>{father ? <PersonLink person={father} /> : fatherName || '-'}</td>
      </tr>
    </>
  );
};
