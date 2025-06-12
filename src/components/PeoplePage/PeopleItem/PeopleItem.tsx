import { useParams } from 'react-router-dom';
import { Person } from '../../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  person: Person;
};

export const PeopleItem: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams<{ personSlug?: string }>();

  const activePerson = person.slug === personSlug;

  return (
    <tr
      data-cy="person"
      className={`${activePerson ? 'has-background-warning' : ''}`}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <PersonLink person={person.mother} />
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {person.father ? (
          <PersonLink person={person.father} />
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
