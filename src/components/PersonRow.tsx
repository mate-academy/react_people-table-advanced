import { useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonRow = ({ person, people }: Props) => {
  const { personSlug } = useParams();
  const selectedPersonSlug = personSlug;

  const mother = people.find(p => p.name === person.motherName);
  const father = people.find(p => p.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': person.slug === selectedPersonSlug,
      })}
    >
      <td>
        <PersonLink person={person} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {mother ? (
          <PersonLink person={mother} />
        ) : person.motherName ? (
          person.motherName
        ) : (
          '-'
        )}
      </td>

      <td>
        {father ? (
          <PersonLink person={father} />
        ) : person.fatherName ? (
          person.fatherName
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
