import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  NavLink,
  Link,
  Navigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Loader } from './components/Loader';
import { getPeople } from './api';
import { Person } from './types';
import './App.scss';

const CENTURIES = ['16', '17', '18', '19', '20'];

const getNavClass = ({ isActive }: { isActive: boolean }) =>
  `navbar-item ${isActive ? 'has-background-grey-lighter' : ''}`;

const PersonLink = ({
  person,
  search,
}: {
  person: Person;
  search: string;
}) => (
  <Link
    to={{
      pathname: `/people/${person.slug}`,
      search,
    }}
    className={person.sex === 'f' ? 'has-text-danger' : ''}
  >
    {person.name}
  </Link>
);

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setLoading(true);
    setError(false);

    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const sortField = searchParams.get('sort');
  const isDesc = searchParams.get('order') === 'desc';

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextParams = new URLSearchParams(searchParams);
    const value = e.target.value;

    if (value.trim()) {
      nextParams.set('query', value);
    } else {
      nextParams.delete('query');
    }

    setSearchParams(nextParams);
  };

  const handleSexChange = (newSex: string | null) => {
    const nextParams = new URLSearchParams(searchParams);

    if (newSex) {
      nextParams.set('sex', newSex);
    } else {
      nextParams.delete('sex');
    }

    setSearchParams(nextParams);
  };

  const handleCenturyToggle = (century: string) => {
    const nextParams = new URLSearchParams(searchParams);
    const current = nextParams.getAll('centuries');

    if (current.includes(century)) {
      const updated = current.filter(c => c !== century);
      nextParams.delete('centuries');
      updated.forEach(c => nextParams.append('centuries', c));
    } else {
      nextParams.append('centuries', century);
    }

    setSearchParams(nextParams);
  };

  const handleAllCenturies = () => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete('centuries');
    setSearchParams(nextParams);
  };

  const handleSort = (field: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (sortField !== field) {
      nextParams.set('sort', field);
      nextParams.delete('order');
    } else if (!isDesc) {
      nextParams.set('order', 'desc');
    } else {
      nextParams.delete('sort');
      nextParams.delete('order');
    }

    setSearchParams(nextParams);
  };

  const handleReset = () => {
    setSearchParams({});
  };

  const filteredPeople = people.filter(person => {
    const normalizedQuery = query.toLowerCase().trim();

    const matchesQuery =
      !normalizedQuery ||
      person.name.toLowerCase().includes(normalizedQuery) ||
      (person.motherName &&
        person.motherName.toLowerCase().includes(normalizedQuery)) ||
      (person.fatherName &&
        person.fatherName.toLowerCase().includes(normalizedQuery));

    const matchesSex = !sexFilter || person.sex === sexFilter;

    const century = String(Math.ceil(person.born / 100));
    const matchesCentury =
      selectedCenturies.length === 0 || selectedCenturies.includes(century);

    return matchesQuery && matchesSex && matchesCentury;
  });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortField) return 0;

    let result = 0;
    if (sortField === 'born' || sortField === 'died') {
      result = a[sortField] - b[sortField];
    } else if (sortField === 'name' || sortField === 'sex') {
      result = a[sortField].localeCompare(b[sortField]);
    }

    return isDesc ? -result : result;
  });

  const currentSearch = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !error && people.length > 0 && (
            <div className="column is-4-desktop">
              <div className="box">
                <h2 className="subtitle">Filters</h2>

                <div className="field">
                  <div className="buttons has-addons">
                    <button
                      type="button"
                      className={`button ${!sexFilter ? 'is-info' : ''}`}
                      onClick={() => handleSexChange(null)}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      className={`button ${sexFilter === 'm' ? 'is-info' : ''}`}
                      onClick={() => handleSexChange('m')}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      className={`button ${sexFilter === 'f' ? 'is-info' : ''}`}
                      onClick={() => handleSexChange('f')}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div className="field">
                  <div className="control has-icons-left">
                    <input
                      type="text"
                      className="input"
                      placeholder="Search"
                      value={query}
                      onChange={handleQueryChange}
                    />
                    <span className="icon is-left">
                      <i className="fas fa-search" />
                    </span>
                  </div>
                </div>

                <div className="field">
                  <div className="buttons">
                    {CENTURIES.map(c => {
                      const isSelected = selectedCenturies.includes(c);
                      return (
                        <button
                          key={c}
                          type="button"
                          className={`button ${isSelected ? 'is-info' : ''}`}
                          onClick={() => handleCenturyToggle(c)}
                        >
                          {c}
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      className={`button ${
                        selectedCenturies.length === 0 ? 'is-success' : ''
                      }`}
                      onClick={handleAllCenturies}
                    >
                      All
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="button is-link is-outlined is-fullwidth"
                  onClick={handleReset}
                >
                  Reset all filters
                </button>
              </div>
            </div>
          )}

          <div className="column">
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
                <>
                  {sortedPeople.length === 0 ? (
                    <p>There are no people matching the current search criteria</p>
                  ) : (
                    <table
                      data-cy="peopleTable"
                      className="table is-striped is-hoverable is-narrow is-fullwidth"
                    >
                      <thead>
                        <tr>
                          <th>
                            <span className="is-flex is-align-items-center">
                              Name
                              <button
                                type="button"
                                className="button is-ghost py-0 px-1"
                                onClick={() => handleSort('name')}
                              >
                                <span className="icon">
                                  <i
                                    className={`fas ${
                                      sortField !== 'name'
                                        ? 'fa-sort'
                                        : isDesc
                                          ? 'fa-sort-down'
                                          : 'fa-sort-up'
                                    }`}
                                  />
                                </span>
                              </button>
                            </span>
                          </th>
                          <th>
                            <span className="is-flex is-align-items-center">
                              Sex
                              <button
                                type="button"
                                className="button is-ghost py-0 px-1"
                                onClick={() => handleSort('sex')}
                              >
                                <span className="icon">
                                  <i
                                    className={`fas ${
                                      sortField !== 'sex'
                                        ? 'fa-sort'
                                        : isDesc
                                          ? 'fa-sort-down'
                                          : 'fa-sort-up'
                                    }`}
                                  />
                                </span>
                              </button>
                            </span>
                          </th>
                          <th>
                            <span className="is-flex is-align-items-center">
                              Born
                              <button
                                type="button"
                                className="button is-ghost py-0 px-1"
                                onClick={() => handleSort('born')}
                              >
                                <span className="icon">
                                  <i
                                    className={`fas ${
                                      sortField !== 'born'
                                        ? 'fa-sort'
                                        : isDesc
                                          ? 'fa-sort-down'
                                          : 'fa-sort-up'
                                    }`}
                                  />
                                </span>
                              </button>
                            </span>
                          </th>
                          <th>
                            <span className="is-flex is-align-items-center">
                              Died
                              <button
                                type="button"
                                className="button is-ghost py-0 px-1"
                                onClick={() => handleSort('died')}
                              >
                                <span className="icon">
                                  <i
                                    className={`fas ${
                                      sortField !== 'died'
                                        ? 'fa-sort'
                                        : isDesc
                                          ? 'fa-sort-down'
                                          : 'fa-sort-up'
                                    }`}
                                  />
                                </span>
                              </button>
                            </span>
                          </th>
                          <th>Mother</th>
                          <th>Father</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sortedPeople.map(person => {
                          const mother = people.find(
                            p => p.name === person.motherName,
                          );
                          const father = people.find(
                            p => p.name === person.fatherName,
                          );

                          return (
                            <tr
                              key={person.slug}
                              data-cy="person"
                              className={
                                person.slug === slug
                                  ? 'has-background-warning'
                                  : ''
                              }
                            >
                              <td>
                                <PersonLink
                                  person={person}
                                  search={currentSearch}
                                />
                              </td>
                              <td>{person.sex}</td>
                              <td>{person.born}</td>
                              <td>{person.died}</td>
                              <td>
                                {!person.motherName ? (
                                  '-'
                                ) : mother ? (
                                  <PersonLink
                                    person={mother}
                                    search={currentSearch}
                                  />
                                ) : (
                                  person.motherName
                                )}
                              </td>
                              <td>
                                {!person.fatherName ? (
                                  '-'
                                ) : father ? (
                                  <PersonLink
                                    person={father}
                                    search={currentSearch}
                                  />
                                ) : (
                                  person.fatherName
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const App = () => {
  const [searchParams] = useSearchParams();
  const currentSearch = searchParams.toString()
    ? `?${searchParams.toString()}`
    : '';

  return (
    <div data-cy="app">
      <nav
        data-cy="nav"
        className="navbar is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <NavLink className={getNavClass} to="/">
              Home
            </NavLink>

            <NavLink
              className={getNavClass}
              to={{
                pathname: '/people',
                search: currentSearch,
              }}
            >
              People
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="people">
              <Route index element={<PeoplePage />} />
              <Route path=":slug" element={<PeoplePage />} />
            </Route>

            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
