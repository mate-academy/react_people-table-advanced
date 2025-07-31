import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types/Person';

type Props = {
  person: Person;
  motherInAPI: string | false | undefined;
  fatherInAPI: string | false | undefined;
  isSelected: boolean;
};

export const PersonLink = ({
  person,
  motherInAPI,
  fatherInAPI,
  isSelected,
}: Props) => {
  const location = useLocation();

  return (
    <tr data-cy="person" className={isSelected ? 'has-background-warning' : ''}>
      <td>
        <Link
          to={`/people/${person.slug}${location.search}`}
          className={`${person.sex === 'f' && 'has-text-danger'}`}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {motherInAPI ? (
          <Link
            to={`/people/${motherInAPI}${location.search}`}
            className={`${'has-text-danger'}`}
          >
            {person.motherName ? person.motherName : '-'}
          </Link>
        ) : (
          `${person.motherName ? person.motherName : '-'}`
        )}
      </td>
      <td>
        {fatherInAPI ? (
          <Link to={`/people/${fatherInAPI}${location.search}`}>
            {person.fatherName ? person.fatherName : '-'}
          </Link>
        ) : (
          `${person.fatherName ? person.fatherName : '-'}`
        )}
      </td>
    </tr>
  );
};
