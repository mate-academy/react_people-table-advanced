import React from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
/* eslint-disable jsx-a11y/control-has-associated-label */

type Props = {
  people: Person[];
  errorMessage: string;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  errorMessage,
  isLoading,
}) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  return (
    <>
      <div className="box table-container">
        {isLoading && <Loader />}

        {errorMessage && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            {errorMessage}
          </p>
        )}

        {!isLoading && !errorMessage && people.length === 0 && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}
        {/* <p>There are no people matching the current search criteria</p> */}

        {!isLoading && !errorMessage && people.length > 0 && (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Name
                    <SearchLink
                      params={{
                        sort:
                          searchParams.get('sort') === 'name' &&
                          searchParams.get('order') === 'desc'
                            ? null
                            : 'name',
                        order:
                          searchParams.get('order') === null &&
                          searchParams.get('sort') === 'name'
                            ? 'desc'
                            : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort-up': sort === 'name' && order === null,
                            'fa-sort-down': sort === 'name' && order === 'desc',
                            'fa-sort': sort !== 'name',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Sex
                    <SearchLink
                      params={{
                        sort:
                          searchParams.get('sort') === 'sex' &&
                          searchParams.get('order') === 'desc'
                            ? null
                            : 'sex',
                        order:
                          searchParams.get('order') === null &&
                          searchParams.get('sort') === 'sex'
                            ? 'desc'
                            : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort-up': sort === 'sex' && order === null,
                            'fa-sort-down': sort === 'sex' && order === 'desc',
                            'fa-sort': sort !== 'sex',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Born
                    <SearchLink
                      params={{
                        sort:
                          searchParams.get('sort') === 'born' &&
                          searchParams.get('order') === 'desc'
                            ? null
                            : 'born',
                        order:
                          searchParams.get('order') === null &&
                          searchParams.get('sort') === 'born'
                            ? 'desc'
                            : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort-up': sort === 'born' && order === null,
                            'fa-sort-down': sort === 'born' && order === 'desc',
                            'fa-sort': sort !== 'born',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Died
                    <SearchLink
                      params={{
                        sort:
                          searchParams.get('sort') === 'died' &&
                          searchParams.get('order') === 'desc'
                            ? null
                            : 'died',
                        order:
                          searchParams.get('order') === null &&
                          searchParams.get('sort') === 'died'
                            ? 'desc'
                            : null,
                      }}
                    >
                      <span className="icon">
                        <i
                          className={classNames('fas', {
                            'fa-sort-up': sort === 'died' && order === null,
                            'fa-sort-down': sort === 'died' && order === 'desc',
                            'fa-sort': sort !== 'died',
                          })}
                        />
                      </span>
                    </SearchLink>
                  </span>
                </th>

                <th>Mother</th>
                <th>Father</th>
              </tr>
            </thead>

            <tbody>
              {people.map(person => (
                <PersonLink key={person.slug} person={person} people={people} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
