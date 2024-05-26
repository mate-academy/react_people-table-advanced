import cn from 'classnames';
import { Person } from '../../types';

import { Link } from 'react-router-dom';

interface Props {
  people: Person[];
  person: Person;
  slug: string | null;
}

export const PersonRow: React.FC<Props> = ({ people, person, slug }) => {
  const mother: Person | null =
    people.find(_person => _person.name === person.motherName) || null;
  const father: Person | null =
    people.find(_person => _person.name === person.fatherName) || null;

  return (
    <tr
      data-cy="person"
      className={cn({
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          className={cn({ 'has-text-danger': person.sex === 'f' })}
          to={`./${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {mother ? (
          <Link className="has-text-danger" to={`./${mother.slug}`}>
            {person.motherName}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>

      <td>
        {father ? (
          <Link to={`./${father.slug}`}>{person.fatherName}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
