import { Person } from '../types/Person';
import { SearchLink } from './SearchLink';
import {
  useSearchParams,
  useParams,
  Link,
  useLocation,
} from 'react-router-dom';

interface Props {
  people: Person[];
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const location = useLocation();

  const sortField = searchParams.get('sort');
  const order = searchParams.get('order');

  const findPersonByName = (name: string | null) =>
    people.find(p => p.name === name);

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return 'fa-sort';
    }

    if (!order) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  const getNextSortParams = (field: string) => {
    if (sortField !== field) {
      return { sort: field, order: 'asc' };
    }

    if (order === 'asc') {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      className="table is-striped is-hoverable is-narrow is-fullwidth"
      data-cy="peopleTable"
    >
      <thead>
        <tr>
          {['name', 'sex', 'born', 'died'].map(field => (
            <th key={field}>
              <span className="is-flex is-flex-wrap-nowrap">
                {field.charAt(0).toUpperCase() + field.slice(1)}

                <SearchLink params={getNextSortParams(field)} className="ml-1">
                  <span className="icon">
                    <i className={`fas ${getSortIcon(field)}`} />
                  </span>
                </SearchLink>
              </span>
            </th>
          ))}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const mother = findPersonByName(person.motherName);
          const father = findPersonByName(person.fatherName);

          return (
            <tr
              key={person.slug}
              data-cy="person"
              className={slug === person.slug ? 'has-background-warning' : ''}
            >
              <td>
                <Link
                  to={`/people/${person.slug}${location.search}`}
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
                  mother ? (
                    <Link
                      to={`/people/${mother.slug}${location.search}`}
                      className="has-text-danger"
                    >
                      {mother.name}
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
                  father ? (
                    <Link to={`/people/${father.slug}${location.search}`}>
                      {father.name}
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
        })}
      </tbody>
    </table>
  );
};
