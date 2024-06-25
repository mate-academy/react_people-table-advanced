import cn from 'classnames';
import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  people: Person[];
  slug?: string;
};

export const PersonRow: React.FC<Props> = ({ person, slug, people }) => {
  const { sex, born, died, fatherName, motherName } = person;

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={cn({
        'has-background-warning': person.slug === slug,
      })}
    >
      <td>
        <PersonLink person={person} people={people} />
      </td>

      <td>{sex}</td>
      <td>{born}</td>
      <td>{died}</td>
      <td>
        {motherName ? <PersonLink name={motherName} people={people} /> : '-'}
      </td>
      <td>
        {fatherName ? <PersonLink name={fatherName} people={people} /> : '-'}
      </td>
    </tr>
  );
};
