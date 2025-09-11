/* eslint-disable @typescript-eslint/indent */
// #region Import

import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { PeopleFilters } from '../components/PeopleFilters';
import { Link, useSearchParams } from 'react-router-dom';
import { ErrorMessage } from '../types/ErrorMessage';
import { usePeople } from '../Context/PeopleContext';
import { SortKey } from '../types/SortKey';
import { SortOrder } from '../types/SortOrder';

// #endregion

export const PeoplePage = () => {
  const [searchParams] = useSearchParams();
  const { users: people, loading, error } = usePeople();

  const query = searchParams.get('query')?.toLowerCase() || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const sortKey = searchParams.get('sort') as SortKey | null;
  const sortOrder = (searchParams.get('order') as SortOrder) || 'asc';

  // #region filteredPeople

  const filteredPeople = people.filter(person => {
    const matchesQuery = person.name.toLowerCase().includes(query);

    const matchesSex = sex ? person.sex === sex : true;

    const matchesCentury = centuries.length
      ? centuries.some(c => {
          const century = Number(c);
          const start = (century - 1) * 100 + 1;
          const end = century * 100;

          return person.born >= start && person.born <= end;
        })
      : true;

    return matchesQuery && matchesSex && matchesCentury;
  });

  // #endregion

  // #region sortedPeople
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (!sortKey) {
      return 0;
    }

    let aValue = a[sortKey];
    let bValue = b[sortKey];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (aValue < bValue) {
      return sortOrder === 'asc' ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortOrder === 'asc' ? 1 : -1;
    }

    return 0;
  });

  const getSortLink = (key: SortKey) => {
    let newOrder: SortOrder | null = 'asc';

    if (sortKey === key) {
      if (sortOrder === 'asc') {
        newOrder = 'desc';
      } else if (sortOrder === 'desc') {
        newOrder = null;
      }
    }

    const params = new URLSearchParams(searchParams);

    if (newOrder) {
      params.set('sort', key);
      params.set('order', newOrder);
    } else {
      params.delete('sort');
      params.delete('order');
    }

    return { search: params.toString() };
  };

  // #endregion

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div
          className="columns
        is-desktop
        is-flex-direction-row-reverse"
        >
          <div
            className="column
          is-7-tablet
          is-narrow-desktop"
          >
            <PeopleFilters />
          </div>

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && (
                <>
                  {error && (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      {ErrorMessage.peopleLoadingError}
                    </p>
                  )}
                  {!error && people.length === 0 && (
                    <p className="has-text-warning" data-cy="noPeopleMessage">
                      {ErrorMessage.noPeople}
                    </p>
                  )}
                  {!error &&
                    people.length > 0 &&
                    filteredPeople.length === 0 && (
                      <p className="has-text-warning" data-cy="noPeopleMessage">
                        {ErrorMessage.search}
                      </p>
                    )}

                  {filteredPeople.length > 0 && (
                    <table
                      className="table
                  is-striped
                  is-hoverable
                  is-narrow
                  is-fullwidth"
                      data-cy="peopleTable"
                    >
                      <thead>
                        <tr>
                          <th>
                            Name
                            <Link to={getSortLink('name')}>
                              <span className="icon">
                                <i
                                  className={`fas fa-sort${
                                    sortKey === 'name'
                                      ? sortOrder === 'asc'
                                        ? '-up'
                                        : '-down'
                                      : ''
                                  }`}
                                />
                              </span>
                            </Link>
                          </th>
                          <th>
                            Sex
                            <Link to={getSortLink('sex')}>
                              <span className="icon">
                                <i
                                  className={`fas fa-sort${
                                    sortKey === 'sex'
                                      ? sortOrder === 'asc'
                                        ? '-up'
                                        : '-down'
                                      : ''
                                  }`}
                                />
                              </span>
                            </Link>
                          </th>
                          <th>
                            Born
                            <Link to={getSortLink('born')}>
                              <span className="icon">
                                <i
                                  className={`fas fa-sort${
                                    sortKey === 'born'
                                      ? sortOrder === 'asc'
                                        ? '-up'
                                        : '-down'
                                      : ''
                                  }`}
                                />
                              </span>
                            </Link>
                          </th>
                          <th>
                            Died
                            <Link to={getSortLink('died')}>
                              <span className="icon">
                                <i
                                  className={`fas fa-sort${
                                    sortKey === 'died'
                                      ? sortOrder === 'asc'
                                        ? '-up'
                                        : '-down'
                                      : ''
                                  }`}
                                />
                              </span>
                            </Link>
                          </th>
                          <th>Mother</th>
                          <th>Father</th>
                        </tr>
                      </thead>

                      <tbody>
                        {sortedPeople.map(person => (
                          <PeopleTable key={person.slug} person={person} />
                        ))}
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
