import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { PeopleTable } from './PeopleTable';
import { Person } from '../types';
import { getPeople } from '../api';
import { getFilteredPeople } from '../helper';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchParams] = useSearchParams();
  const peopleId = useLocation();

  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const sortField = searchParams.get('sort') as keyof Person || '';
  const sortOrder = searchParams.get('order') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setHasError(false);

        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
      } catch (err) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const visiblePeople = getFilteredPeople(
    people,
    sortField,
    sortOrder,
    sex,
    query,
    centuries,
  );

  const getSortingParams = (sortBy: string): SearchParams => {
    if (sortField !== sortBy) {
      return { sort: sortBy, order: null };
    }

    if (!sortOrder) {
      return { order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIconClass = (sortBy: string): string => {
    const sortByToLowerCase = sortBy.toLowerCase();

    return cn('fas', {
      'fa-sort': sortField !== sortByToLowerCase,
      'fa-sort-up': sortField === sortByToLowerCase && !sortOrder,
      'fa-sort-down': sortField === sortByToLowerCase && sortOrder,
    });
  };

  const SORT_LIST = ['Name', 'Sex', 'Born', 'Died'];

  return (
    <>
      <h1 className="title">People Page</h1>
      {hasError ? (
        <tr>
          <td
            className="has-text-danger"
            data-cy="peopleLoadingError"
          >
            Something went wrong
          </td>
        </tr>
      ) : (
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="block">
              <div className="columns is-desktop is-flex-direction-row-reverse">
                <div className="column is-7-tablet is-narrow-desktop">
                  <PeopleFilters />
                </div>

                <div className="column">
                  <table
                    data-cy="peopleTable"
                    className="table is-striped is-hoverable
                            is-narrow is-fullwidth"
                  >
                    <thead>
                      <tr>
                        {SORT_LIST.map(sortItem => (
                          <th key={sortItem}>
                            <span className="is-flex is-flex-wrap-nowrap">
                              {sortItem}
                              <SearchLink
                                params={getSortingParams(
                                  sortItem.toLowerCase(),
                                )}
                              >
                                <span className="icon">
                                  <i
                                    className={
                                      getSortIconClass(sortItem)
                                    }
                                  />
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
                      {people.length === 0 ? (
                        <tr>
                          <td colSpan={6} data-cy="noPeopleMessage">
                            There are no people on the server
                          </td>
                        </tr>
                      ) : (
                        visiblePeople.map((person) => {
                          const hasMother = people
                            .find(({ name }) => name === person.motherName)
                            || null;
                          const hasFather = people
                            .find(({ name }) => name === person.fatherName)
                            || null;

                          return (
                            <tr
                              key={person.slug}
                              className={cn({
                                'has-background-warning': peopleId.pathname === `/people/${person.slug}`,
                              })}
                            >
                              <PeopleTable
                                person={person}
                                hasMother={hasMother}
                                hasFather={hasFather}
                              />
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
