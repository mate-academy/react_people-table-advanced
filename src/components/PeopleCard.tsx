import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import classNames from 'classnames';
interface Props {
  person: Person;
  people: Person[] | null;
}
export const PeopleCard: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();
  const selectedPerson = personSlug;

  const mother = person.motherName
    ? people?.find(per => per.name === person.motherName)
    : undefined;

  const father = person.fatherName
    ? people?.find(per => per.name === person.fatherName)
    : undefined;

  return (
    <tr
      key={person.slug}
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
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
