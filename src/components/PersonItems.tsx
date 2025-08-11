import cn from 'classnames';
import { Person } from '../types/Person';
import { useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

type Props = {
  person: Person;
};
export const PersonItem: React.FC<Props> = ({ person }) => {
  const { personSlug } = useParams();

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': personSlug === person.slug,
      })}
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
