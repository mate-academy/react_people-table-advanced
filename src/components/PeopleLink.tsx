import { Link, NavLink, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';

interface PersonLinkProps {
  person: Person;
  people: Person[];
  personSlug: string;
}

export const PersonLink: React.FC<PersonLinkProps> = (
  { person, people, personSlug },
) => {
  const [searchParams] = useSearchParams();

  const mother = people.find(mum => mum.name === person.motherName);
  const father = people.find(dad => dad.name === person.fatherName);

  return (
    <tr
      data-cy="person"
      className={cn(
        { 'has-background-warning': personSlug === person.slug },
      )}
    >
      <td>
        <NavLink
          className={cn({
            'has-text-danger': person.sex === 'f',
          })}
          to={`/people/${person.slug}?${searchParams.toString()}`}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {mother ? (
        <td>
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        </td>
      ) : (
        <td>{person.motherName || '-'}</td>
      )}

      {father ? (
        <td>
          <Link to={`/people/${father.slug}`}>
            {father.name}
          </Link>
        </td>
      ) : (
        <td>{person.fatherName || '-'}</td>
      )}
    </tr>
  );
};
