import React from 'react';
import { ListOfPeople } from './ListOfPeople';
import { getSearchWith } from '../../../utils/searchHelper';
import { Link } from 'react-router-dom';
import { Person } from '../../../types';

export interface PeopleTableProps {
  people: Person[];
  searchParams: URLSearchParams;
}

export const PeopleTable: React.FC<PeopleTableProps> = ({
  people,
  searchParams,
}) => {
  const sortingParams = searchParams.get('sort');
  const sortingOrder = searchParams.get('order');
  const sortedName = sortingParams === 'name';
  const orderedName = sortingOrder === 'desc';

  const sortedSex = sortingParams === 'sex';
  const orderedSex = sortingOrder === 'desc';

  const sortedBorn = sortingParams === 'born';
  const orderedBorn = sortingOrder === 'desc';

  const sortedDied = sortingParams === 'died';
  const ordereddDied = sortingOrder === 'desc';

  return (
    <div className="block">
      <div className="box table-container">
        <table
          data-cy="peopleTable"
          className="table is-striped is-hoverable is-fullwidth"
        >
          {/* "fas fa-sort" */}
          <thead>
            <tr>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Name
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: !sortedName
                          ? 'name'
                          : !orderedName
                            ? 'name'
                            : null,
                        order: !sortedName
                          ? null
                          : !orderedName
                            ? 'desc'
                            : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={
                          !sortedName
                            ? 'fa fa-sort'
                            : !orderedName
                              ? 'fa fa-sort-up'
                              : 'fa fa-sort-down'
                        }
                      />
                    </span>
                  </Link>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: !sortedSex ? 'sex' : !orderedSex ? 'sex' : null,
                        order: !sortedSex ? null : !orderedSex ? 'desc' : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={
                          !sortedSex
                            ? 'fa fa-sort'
                            : !orderedSex
                              ? 'fa fa-sort-up'
                              : 'fa fa-sort-down'
                        }
                      />
                    </span>
                  </Link>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: !sortedBorn
                          ? 'born'
                          : !orderedBorn
                            ? 'born'
                            : null,
                        order: !sortedBorn
                          ? null
                          : !orderedBorn
                            ? 'desc'
                            : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={
                          !sortedBorn
                            ? 'fa fa-sort'
                            : !orderedBorn
                              ? 'fa fa-sort-up'
                              : 'fa fa-sort-down'
                        }
                      />
                    </span>
                  </Link>
                </span>
              </th>
              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <Link
                    to={{
                      search: getSearchWith(searchParams, {
                        sort: !sortedDied
                          ? 'died'
                          : !ordereddDied
                            ? 'died'
                            : null,
                        order: !sortedDied
                          ? null
                          : !ordereddDied
                            ? 'desc'
                            : null,
                      }),
                    }}
                  >
                    <span className="icon">
                      <i
                        className={
                          !sortedDied
                            ? 'fa fa-sort'
                            : !ordereddDied
                              ? 'fa fa-sort-up'
                              : 'fa fa-sort-down'
                        }
                      />
                    </span>
                  </Link>
                </span>
              </th>
              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>
          <ListOfPeople people={people} searchParams={searchParams} />
        </table>
      </div>
    </div>
  );
};
