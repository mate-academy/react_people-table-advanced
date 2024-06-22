import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
  people: Person[];
  slug?: string;
};

export const PersonRow: React.FC<Props> = ({ person, slug, people }) => {
  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={person.slug === slug ? 'has-background-warning' : ''}
    >
      <td>
        <PersonLink person={person} people={people} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          <PersonLink name={person.motherName} people={people} />
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          <PersonLink name={person.fatherName} people={people} />
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
