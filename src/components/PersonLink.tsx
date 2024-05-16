import { NavLink } from 'react-router-dom';
import { Person } from '../types';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const findPersonByName = (name: string) => people.find(p => p.name === name);

  const mother = person.motherName ? findPersonByName(person.motherName) : null;
  const father = person.fatherName ? findPersonByName(person.fatherName) : null;

  return (
    <>
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <NavLink to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </NavLink>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <NavLink
            to={`/people/${father.slug}`}
            className={person.sex === 'f' ? 'has-text-danger' : ''}
          >
            {father.name}
          </NavLink>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </>
  );
};
