/* eslint-disable object-curly-newline */
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getPeople } from '../api';
import { extendPeople, filterPeople } from '../utils';
import { ExtendedPerson } from '../types';
import { Loader } from './Loader';
import { PersonCell } from './PersonCell';
import { getSearchWith } from '../utils/searchHelper';

const AVAILABLE_FILTER_TYPES = ['name', 'sex', 'born', 'died'];

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<ExtendedPerson[] | null>(null);
  const [filteredPeople, setFilteredPeople]
    = useState<ExtendedPerson[]>([]);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('sort') || '';
  const order = searchParams.get('order') || null;
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';
  const centuries = searchParams.getAll('centuries') || [];

  useEffect(() => {
    getPeople()
      .then(response => {
        setPeople(extendPeople(response));
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    setFilteredPeople(
      filterPeople(people, filter, order, query, centuries, sex),
    );
  }, [filter, order, sex, centuries]);

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (filteredPeople.length === 0) {
    return <p>There are no people matching the current search criteria</p>;
  }

  if (!people) {
    return <Loader />;
  }

  return (people.length === 0
    ? (
      <p data-cy="noPeopleMessage">
        There are no people on the server
      </p>
    ) : (
      <table
        data-cy="peopleTable"
        className="table is-striped is-hoverable is-narrow is-fullwidth"
      >
        <thead>
          <tr>
            {AVAILABLE_FILTER_TYPES.map(filterType => {
              return (
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    {filterType[0].toUpperCase() + filterType.slice(1)}
                    <Link
                      to={{
                        search: getSearchWith(
                          searchParams,
                          {
                            sort: order === 'desc' ? null : filterType,
                            order: (() => {
                              switch (order) {
                                case null:
                                  return 'asc';
                                case 'asc':
                                  return 'desc';
                                case 'desc':
                                default:
                                  return null;
                              }
                            })(),
                          },
                        ),
                      }}
                    >
                      <span className="icon">
                        {filterType === filter
                          ? (
                            <i
                              className={classNames(
                                'fas',
                                {
                                  'fa-sort': order === null,
                                  'fa-sort-up': order === 'asc',
                                  'fa-sort-down': order === 'desc',
                                },
                              )}
                            />
                          ) : <i className="fas fa-sort" />}
                      </span>
                    </Link>
                  </span>
                </th>
              );
            })}

            <th>Mother</th>
            <th>Father</th>
          </tr>
        </thead>

        <tbody>
          {filteredPeople.map(person => (
            <PersonCell
              person={person}
            />
          ))}
        </tbody>
      </table>
    )
  );
};
