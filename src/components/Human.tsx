import classNames from 'classnames';
import { Person } from '.././types';
import { PersonLink } from '../components/PersonLink';

type Props = {
  person: Person;
  selectedSlug?: string;
};

export const Human: React.FC<Props> = ({ person, selectedSlug }) => {
  const { sex, born, died, fatherName, motherName, slug, mother, father } =
    person;

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedSlug === slug,
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
  );
};
