import { Link, useLocation, useParams } from 'react-router-dom';
import { useGlobalState } from '../store/GlobalProvider';
import { Person } from '../types';

export const PersonLink = ({ person }: { person: Person }) => {
  const { people } = useGlobalState();
  const { search } = useLocation();
  const { slug } = useParams();

  const personMother = people.find(
    motherToFind => person.motherName === motherToFind.name,
  );

  const personFather = people.find(
    fatherToFind => person.fatherName === fatherToFind.name,
  );

  return (
    <tr
      data-cy="person"
      className={slug === person.slug ? 'has-background-warning' : ''}
    >
      <td>
        <Link
          to={`/people/${person.slug}${search}`}
          className={person.sex === 'f' ? 'has-text-danger' : ''}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {person.motherName ? (
          personMother ? (
            <Link
              to={`/people/${personMother.slug}${search}`}
              className="has-text-danger"
            >
              {personMother.name}
            </Link>
          ) : (
            person.motherName
          )
        ) : (
          '-'
        )}
      </td>
      <td>
        {person.fatherName ? (
          personFather ? (
            <Link to={`/people/${personFather.slug}${search}`}>
              {personFather.name}
            </Link>
          ) : (
            person.fatherName
          )
        ) : (
          '-'
        )}
      </td>
    </tr>
  );
};
