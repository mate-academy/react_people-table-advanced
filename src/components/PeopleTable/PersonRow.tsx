import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Person } from '../../types';

export const PersonRow:React.FC<{
  person: Person,
}> = ({ person }) => {
  const getName = (name:string | null) => (!name ? '-' : name);

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  return (
    <tr
      data-cy="person"
      className={pathname === `/people/${person.slug}`
        ? 'has-background-warning'
        : ''}
    >
      <td>
        <Link to={`/people/${person.slug}`} className={person.sex === 'm' ? '' : 'has-text-danger'}>
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.mother ? (
          <Link
            to={`/people/${person.mother.slug}?${searchParams.toString()}`}
            className="has-text-danger"
          >
            {person.motherName}
          </Link>
        ) : getName(person.motherName) }

      </td>
      <td>
        {person.father ? (
          <Link to={`/people/${person.father.slug}?${searchParams.toString()}`}>
            {person.fatherName}
          </Link>
        ) : getName(person.fatherName) }

      </td>
    </tr>
  );
};
