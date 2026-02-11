/* eslint-disable jsx-a11y/control-has-associated-label */

import React from 'react';
import { Person } from '../types';
import { useLocation, useSearchParams } from 'react-router-dom';
import { PeopleFilters } from './PeopleFilters';
import { Loader } from './Loader';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { PersonLink } from './PersonLink';

type Props = {
  people: Person[];
  error: boolean;
  loading: boolean;
  totalPeople: number;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  error,
  loading,
  totalPeople,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const getSortParams = (field: string) => {
    if (sort !== field) {
      return { sort: field, order: null };
    }

    if (!order) {
      return { sort: field, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  const getSortIcon = (field: string) => {
    if (sort !== field) {
      return 'fa-sort';
    }

    return order === 'desc' ? 'fa-sort-down' : 'fa-sort-up';
  };

  return (
    <>
      <div className="block">
        <div className="columns is-desktop is-flex-direction-row-reverse">
          {!loading && (
            <div className="column is-7-tablet is-narrow-desktop">
              <PeopleFilters query={query} sex={sex} centuries={centuries} />
            </div>
          )}

          <div className="column">
            <div className="box table-container">
              {loading && <Loader />}

              {!loading && error && (
                <p data-cy="peopleLoadingError">Something went wrong</p>
              )}

              {totalPeople === 0 && !loading && !error && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}

              {totalPeople > 0 && people.length === 0 && !loading && !error && (
                <p>There are no people matching the current search criteria</p>
              )}

              {people.length > 0 && !loading && !error && (
                <table
                  data-cy="peopleTable"
                  /* eslint-disable-next-line max-len */
                  className="table is-striped is-hoverable is-narrow is-fullwidth"
                >
                  <thead>
                    <tr>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Name
                          <SearchLink params={getSortParams('name')}>
                            <span className="icon">
                              <i className={`fas ${getSortIcon('name')}`}></i>
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Sex
                          <SearchLink params={getSortParams('sex')}>
                            <span className="icon">
                              <i className={`fas ${getSortIcon('sex')}`}></i>
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Born
                          <SearchLink params={getSortParams('born')}>
                            <span className="icon">
                              <i className={`fas ${getSortIcon('born')}`}></i>
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>
                        <span className="is-flex is-flex-wrap-nowrap">
                          Died
                          <SearchLink params={getSortParams('died')}>
                            <span className="icon">
                              <i className={`fas ${getSortIcon('died')}`}></i>
                            </span>
                          </SearchLink>
                        </span>
                      </th>
                      <th>Mother</th>
                      <th>Father</th>
                    </tr>
                  </thead>
                  <tbody>
                    {people.map(person => {
                      const mother = people.find(
                        p => p.name === person.motherName,
                      );
                      const father = people.find(
                        p => p.name === person.fatherName,
                      );

                      return (
                        <tr
                          data-cy="person"
                          key={person.slug}
                          className={cn({
                            'has-background-warning':
                              location.pathname === `/people/${person.slug}`,
                          })}
                        >
                          <td>
                            <PersonLink person={person} />
                          </td>

                          <td>{person.sex}</td>
                          <td>{person.born}</td>
                          <td>{person.died}</td>
                          <td>
                            {person.motherName ? (
                              mother ? (
                                <PersonLink person={mother} />
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
                                <PersonLink person={father} />
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
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
