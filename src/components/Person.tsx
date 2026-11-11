import { useLocation } from 'react-router-dom';
import { Person } from '../types/Person';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonComponent = ({ person, people }: Props) => {
  const location = useLocation();

  const mother = people.find(p => p.name === person.motherName);

  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={
        location.pathname === `/people/${person.slug}`
          ? 'has-background-warning'
          : ''
      }
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {mother ? (
        <td>
          <PersonLink person={mother} />
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <PersonLink person={father} />
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
