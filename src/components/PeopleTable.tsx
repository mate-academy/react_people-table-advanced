import { Loader } from '../components/Loader';
import { Person } from '../types/Person';
import {
  Link,
  useParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[];
  loading: boolean;
  error: string | null;
}

export const PeopleTable: React.FC<Props> = ({ people, loading, error }) => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query')?.toLowerCase() || '';
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const filteredPeople = people.filter(person => {
    const bornCentury = Math.floor(person.born / 100) + 1;

    return (
      (!sex || person.sex === sex) &&
      (centuries.length === 0 || centuries.includes(bornCentury.toString())) &&
      (query === '' ||
        person.name.toLowerCase().includes(query) ||
        person.motherName?.toLowerCase().includes(query) ||
        person.fatherName?.toLowerCase().includes(query))
    );
  });

  const sortedPeople = [...filteredPeople];

  if (sort && order) {
    sortedPeople.sort((a, b) => {
      let result = 0;

      if (sort === 'name') {
        result = a.name.localeCompare(b.name);
      } else if (sort === 'sex') {
        result = a.sex.localeCompare(b.sex);
      } else if (sort === 'born') {
        result = a.born - b.born;
      } else if (sort === 'died') {
        result = a.died - b.died;
      }

      return order === 'desc' ? -result : result;
    });
  }

  const handleLinkClick = (slugi: string) => {
    navigate(`/people/${slugi}?${searchParams.toString()}`);
  };

  const getNextOrder = (column: string): string | null => {
    if (sort !== column) {
      return 'asc';
    } else if (order === 'asc') {
      return 'desc';
    } else if (order === 'desc') {
      return null;
    }

    return 'asc';
  };

  const getSortIcon = (column: string): string => {
    if (sort !== column) {
      return 'fas fa-sort';
    } else if (order === 'asc') {
      return 'fas fa-sort-up';
    } else if (order === 'desc') {
      return 'fas fa-sort-down';
    }

    return 'fas fa-sort';
  };

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}
          {!loading && !error && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
          {!loading && !error && people.length > 0 && (
            <table
              data-cy="peopleTable"
              className="table is-striped is-hoverable is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  {['name', 'sex', 'born', 'died'].map(column => (
                    <th key={column}>
                      <span className="is-flex is-flex-wrap-nowrap">
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                        <SearchLink
                          params={{
                            sort: getNextOrder(column) ? column : null,
                            order: getNextOrder(column),
                          }}
                        >
                          <span className="icon">
                            <i className={getSortIcon(column)} />
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
                {sortedPeople.map(person => {
                  const findNameMum = people.find(
                    m => m.name === person.motherName,
                  );
                  const findNameFather = people.find(
                    f => f.name === person.fatherName,
                  );

                  return (
                    <tr
                      key={person.slug}
                      data-cy="person"
                      className={
                        slug === person.slug ? 'has-background-warning' : ''
                      }
                    >
                      <td>
                        <a
                          href={`#/people/${person.slug}`}
                          className={
                            person.sex === 'f' ? 'has-text-danger' : ''
                          }
                          onClick={() => handleLinkClick(person.slug)}
                        >
                          {person.name}
                        </a>
                      </td>
                      <td>{person.sex}</td>
                      <td>{person.born}</td>
                      <td>{person.died}</td>
                      <td>
                        {person.motherName && findNameMum ? (
                          <Link
                            to={`/people/${people.find(m => m.name === person.motherName)?.slug}?${searchParams.toString()}`}
                            className="has-text-danger"
                          >
                            {person.motherName}
                          </Link>
                        ) : (
                          person.motherName || '-'
                        )}
                      </td>
                      <td>
                        {person.fatherName && findNameFather ? (
                          <Link
                            to={`/people/${people.find(f => f.name === person.fatherName)?.slug}?${searchParams.toString()}`}
                            className="has-text-link"
                          >
                            {person.fatherName}
                          </Link>
                        ) : (
                          person.fatherName || '-'
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
