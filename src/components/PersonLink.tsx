import { Link } from 'react-router-dom';
import { Person } from '../types';
import cn from 'classnames';
import { useContext } from 'react';
import { SlugContext } from './SlugContext';

interface Props {
  person: Person;
  mother: string | undefined;
  father: string | undefined;
}

export const PersonLink = ({ person, mother, father }: Props) => {
  const slug = useContext(SlugContext);

  const motherInfo = person.motherName ? person.motherName : '-';
  const fatherInfo = person.fatherName ? person.fatherName : '-';

  return (
    <tr
      data-cy="person"
      className={cn(person.slug === slug ? 'has-background-warning' : '')}
    >
      <td>
        <Link
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
          to={`/people/${person.slug}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>

      <td>{person.born}</td>

      <td>{person.died}</td>

      <td>
        {mother ? (
          <Link className={'has-text-danger'} to={`/people/${mother}`}>
            {person.motherName}
          </Link>
        ) : (
          motherInfo
        )}
      </td>

      <td>
        {father ? (
          <Link to={`/people/${father}`}>{person.fatherName}</Link>
        ) : (
          fatherInfo
        )}
      </td>
    </tr>
  );
};
