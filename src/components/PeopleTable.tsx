import {
  useSearchParams,
  Link,
  useParams,
  useLocation,
} from 'react-router-dom';
import { Person } from '../types';
import { Loader } from './Loader';

export const PeopleTable = ({ people, loading, error }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const { slug } = useParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  function filterPeople(_people: Person[]): Person[] {
    let persons = _people;

    if (sex) {
      persons = persons.filter(person => person.sex === sex);
    }

    if (query?.trim()) {
      persons = persons.filter(person => {
        const normalizedQuery = query.toLowerCase();

        return (
          person.name.toLowerCase().includes(normalizedQuery) ||
          person.fatherName?.toLowerCase().includes(normalizedQuery) ||
          person.motherName?.toLowerCase().includes(normalizedQuery)
        );
      });
    }

    if (centuries.length > 0) {
      persons = persons.filter(person => {
        const century = String(Math.ceil(person.born / 100));

        return centuries.includes(century);
      });
    }

    return persons;
  }

  function sortPeople(_people: Person[]): Person[] {
    const peopleCopy = [..._people];

    if (!sort) {
      return peopleCopy;
    }

    peopleCopy.sort((a, b) => {
      let valA: unknown;
      let valB: unknown;

      switch (sort) {
        case 'name':
          valA = a.name;
          valB = b.name;
          break;
        case 'sex':
          valA = a.sex;
          valB = b.sex;
          break;
        case 'born':
          valA = a.born;
          valB = b.born;
          break;
        case 'died':
          valA = a.died;
          valB = b.died;
          break;
        default:
          return 0;
      }

      // Ascending order
      if (!order || order === 'asc') {
        return valA > valB ? 1 : valA < valB ? -1 : 0;
      }

      // Descending order
      if (order === 'desc') {
        return valA < valB ? 1 : valA > valB ? -1 : 0;
      }

      return 0;
    });

    return peopleCopy;
  }

  const visiblePeople = sortPeople(filterPeople(people));

  const toggleSort = (column: string) => {
    const params = new URLSearchParams(searchParams);

    if (sort !== column) {
      // First click: new column → sort ascending
      params.set('sort', column);
      params.set('order', 'asc');
    } else {
      // Same column: toggle order
      if (!order || order === 'asc') {
        // Second click: ascending → descending
        params.set('order', 'desc');
      } else if (order === 'desc') {
        // Third click: descending → reset
        params.delete('sort');
        params.delete('order');
      }
    }

    setSearchParams(params);
  };

  // Helper to find person by name
  const findPersonByName = (name: string): Person | undefined => {
    return people.find(person => person.name === name);
  };

  // Helper to create a Link for mother/father
  const createPersonLink = (name: string): JSX.Element => {
    const person = findPersonByName(name);

    if (!person) {
      return <span>{name}</span>;
    }

    const linkClass = person.sex === 'f' ? 'has-text-danger' : '';

    return (
      <Link
        to={{ pathname: '/people/' + person.slug, search: location.search }}
        className={linkClass}
      >
        {name}
      </Link>
    );
  };

  return (
    <div>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && <Loader />}

          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
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
                  {['name', 'sex', 'born', 'died'].map(col => (
                    <th key={col}>
                      <a
                        href="#"
                        className="is-flex is-flex-wrap-nowrap"
                        onClick={e => {
                          e.preventDefault();
                          toggleSort(col);
                        }}
                      >
                        {col.charAt(0).toUpperCase() + col.slice(1)}
                        <span className="icon">
                          <i
                            className={`fas ${
                              sort !== col
                                ? 'fa-sort'
                                : order === 'asc'
                                  ? 'fa-sort-up'
                                  : 'fa-sort-down'
                            }`}
                          ></i>
                        </span>
                      </a>
                    </th>
                  ))}
                  <th>Mother</th>
                  <th>Father</th>
                </tr>
              </thead>

              <tbody>
                {visiblePeople.map(person => (
                  <tr
                    key={person.slug}
                    data-cy="person"
                    className={
                      slug === person.slug ? 'has-background-warning' : ''
                    }
                  >
                    <td>
                      <Link
                        to={{
                          pathname: '/people/' + person.slug,
                          search: location.search,
                        }}
                        className={person.sex === 'f' ? 'has-text-danger' : ''}
                      >
                        {person.name}
                      </Link>
                    </td>
                    <td>{person.sex}</td>
                    <td>{person.born}</td>
                    <td>{person.died}</td>
                    <td>
                      {person.motherName
                        ? createPersonLink(person.motherName)
                        : '-'}
                    </td>
                    <td>
                      {person.fatherName
                        ? createPersonLink(person.fatherName)
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
