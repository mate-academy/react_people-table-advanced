import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PeopleFilters } from './PeopleFilters';

type Human = {
  name: string;
  sex: string;
  born: number;
  died: number;
  fatherName: string;
  motherName: string;
  slug: string;
};

export const PeoplePage = () => {
  const [peopleList, setPeopleList] = useState<Human[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [originalList, setOriginalList] = useState<Human[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'asc' | 'desc'>('default');
  const [activeSort, setActiveSort] = useState<string>('');

  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sexParams = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || 0;

  const queryLowerCase = query.toLowerCase();
  const columns = ['Name', 'Sex', 'Born', 'Died'];

  const filteredList = [...peopleList].filter(user => {
    const matchesQuery =
      user.name?.toLowerCase().includes(queryLowerCase) ||
      user.motherName?.toLowerCase().includes(queryLowerCase) ||
      user.fatherName?.toLowerCase().includes(queryLowerCase);

    const matchesSex = sexParams ? user.sex === sexParams : true;

    const matchesCenturies = centuries.length
      ? centuries.some(century => Math.floor(user.born / 100) + 1 === +century)
      : true;

    return matchesQuery && matchesSex && matchesCenturies;
  });

  const handleSort = (sortKey: keyof Human) => {
    let nextSortOrder: 'default' | 'asc' | 'desc';

    if (activeSort !== sortKey || sortBy === 'default') {
      nextSortOrder = 'asc';
    } else if (sortBy === 'asc') {
      nextSortOrder = 'desc';
    } else {
      nextSortOrder = 'default';
    }

    setSortBy(nextSortOrder);
    setActiveSort(sortKey);

    const newSearchParams = new URLSearchParams(searchParams);

    if (nextSortOrder === 'default') {
      newSearchParams.delete('sort');
      newSearchParams.delete('order');
    } else {
      newSearchParams.set('sort', sortKey.toLowerCase());
      if (nextSortOrder === 'desc') {
        newSearchParams.set('order', 'desc');
      } else {
        newSearchParams.delete('order');
      }
    }

    setSearchParams(newSearchParams);

    if (nextSortOrder === 'default') {
      setPeopleList([...originalList]);
    } else {
      const sortedList = [...peopleList].sort((a, b) => {
        const firstValue = a[sortKey];
        const secondValue = b[sortKey];

        if (typeof firstValue === 'string' && typeof secondValue === 'string') {
          return nextSortOrder === 'asc'
            ? firstValue.localeCompare(secondValue)
            : secondValue.localeCompare(firstValue);
        }

        if (typeof firstValue === 'number' && typeof secondValue === 'number') {
          return nextSortOrder === 'asc'
            ? firstValue - secondValue
            : secondValue - firstValue;
        }

        return 0;
      });

      setPeopleList(sortedList);
    }
  };

  useEffect(() => {
    setLoading(true);
    setErrorMessage(false);
    setDataLoaded(false);

    setTimeout(() => {
      fetch('https://mate-academy.github.io/react_people-table/api/people.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('');
          }

          return response.json();
        })
        .then(data => {
          setPeopleList(data);
          setOriginalList(data);
          setDataLoaded(true);
        })
        .catch(() => {
          setErrorMessage(true);
          setDataLoaded(true);
        })
        .finally(() => setLoading(false));
    }, 500);
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && !errorMessage && peopleList.length > 0 && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && errorMessage && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {!loading &&
                !errorMessage &&
                dataLoaded &&
                peopleList.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

              {!loading &&
                !errorMessage &&
                filteredList.length === 0 &&
                peopleList.length > 0 && (
                  <p>
                    There are no people matching the current search criteria
                  </p>
                )}

              {!loading && !errorMessage && filteredList.length > 0 && (
                <table
                  data-cy="peopleTable"
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      {columns.map(column => (
                        <th key={column}>
                          <span className="is-flex is-flex-wrap-nowrap">
                            {column}
                            <a
                              href={`#/people?sort=${column.toLowerCase()}${
                                sortBy === 'asc' ? '&order=desc' : ''
                              }`}
                              onClick={e => {
                                e.preventDefault();
                                handleSort(column.toLowerCase() as keyof Human);
                              }}
                            >
                              <span className="icon">
                                <i
                                  className={classNames('fas', {
                                    'fa-sort-up':
                                      activeSort === column.toLowerCase() &&
                                      sortBy === 'asc',
                                    'fa-sort-down':
                                      activeSort === column.toLowerCase() &&
                                      sortBy === 'desc',
                                    'fa-sort':
                                      activeSort !== column.toLowerCase() ||
                                      sortBy === 'default',
                                  })}
                                />
                              </span>
                            </a>
                          </span>
                        </th>
                      ))}
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredList.map(person => {
                      const mother = peopleList.find(
                        p => person.motherName === p.name,
                      );
                      const father = peopleList.find(
                        p => person.fatherName === p.name,
                      );

                      return (
                        <tr
                          data-cy="person"
                          key={person.slug}
                          className={classNames('', {
                            'has-background-warning': name === person.slug,
                          })}
                        >
                          <td>
                            <NavLink
                              to={`../${person.slug}`}
                              className={
                                person.sex === 'f' ? 'has-text-danger' : ''
                              }
                            >
                              {person.name}
                            </NavLink>
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>
                            {mother ? (
                              <NavLink
                                to={`../${mother.slug}`}
                                className="has-text-danger"
                              >
                                {person.motherName}
                              </NavLink>
                            ) : (
                              person.motherName || '-'
                            )}
                          </td>

                          <td>
                            {father ? (
                              <NavLink to={`../${father.slug}`}>
                                {person.fatherName}
                              </NavLink>
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
        </div>
      </div>
    </div>
  );
};
