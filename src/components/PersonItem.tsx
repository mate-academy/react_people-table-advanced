import { NavLink, useLocation } from 'react-router-dom';
import { Person } from '../types';

type PersonItemProps = {
  person: Person;
  people: Person[];
};

export const PersonItem = ({ person, people }: PersonItemProps) => {
  const { pathname } = useLocation();
  const mother = people.find(p => p.name === person.motherName) || null;
  const father = people.find(p => p.name === person.fatherName) || null;

  return (
    <tr
      data-cy="person"
      className={
        pathname === `/people/${person.slug}`
          ? 'has-background-warning'
          : ''
      }
    >
      <td>
        <NavLink
          to={`/people/${person.slug}`}
          className={
            person.sex === 'f'
              ? 'has-text-danger'
              : ''
          }
        >
          {person.name}
        </NavLink>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother
          ? (
            <NavLink
              className="has-text-danger"
              to={`/people/${mother.slug}`}
            >
              {mother.name}
            </NavLink>
          ) : person.motherName || '-'}
      </td>
      <td>
        {father
          ? (
            <NavLink
              to={`/people/${father.slug}`}
            >
              {father.name}
            </NavLink>
          ) : person.fatherName || '-'}
      </td>
    </tr>
  );
};
