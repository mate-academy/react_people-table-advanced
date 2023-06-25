import { FC } from 'react';
import classNames from 'classnames';
import {
  Link, useLocation, useResolvedPath, useSearchParams,
} from 'react-router-dom';

import { Person } from '../types';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[],
  slugPerson: string | undefined,
};

export const PeopleTable: FC<Props> = ({
  people, slugPerson,
}) => {
  const location = useLocation();
  const parentPath = useResolvedPath('../').pathname;
  const [seachParams] = useSearchParams();
  const sort = seachParams.get('sort');
  const order = seachParams.get('order');

  const getQueryParams = (sortName: string) => {
    if (sort === sortName && order === 'desc') {
      return {
        sort: null,
        order: null,
      };
    }

    if (sort === sortName) {
      return {
        sort: sortName,
        order: 'desc',
      };
    }

    return {
      sort: sortName,
      order: null,
    };
  };

  return (
    <>
      {people && people.length > 0 && (
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
                    params={getQueryParams('name')}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'fas fa-sort',
                            {
                              'fa-sort-up':
                              sort === 'name' && order !== 'desc',
                            },
                            {
                              'fa-sort-down':
                               order === 'desc' && sort === 'name',
                            },
                          )
                        }
                      />
                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Sex
                  <SearchLink
                    params={getQueryParams('sex')}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'fas fa-sort',
                            {
                              'fa-sort-up':
                              sort === 'sex' && order !== 'desc',
                            },
                            {
                              'fa-sort-down':
                               order === 'desc' && sort === 'sex',
                            },
                          )
                        }
                      />
                      {' '}

                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Born
                  <SearchLink
                    params={getQueryParams('born')}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'fas fa-sort',
                            {
                              'fa-sort-up':
                              sort === 'born' && order !== 'desc',
                            },
                            {
                              'fa-sort-down':
                               order === 'desc' && sort === 'born',
                            },
                          )
                        }
                      />
                      {' '}

                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>
                <span className="is-flex is-flex-wrap-nowrap">
                  Died
                  <SearchLink
                    params={getQueryParams('died')}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'fas fa-sort',
                            {
                              'fa-sort-up':
                              sort === 'died' && order !== 'desc',
                            },
                            {
                              'fa-sort-down':
                               order === 'desc' && sort === 'died',
                            },
                          )
                        }
                      />
                      {' '}

                    </span>
                  </SearchLink>
                </span>
              </th>

              <th>Mother</th>
              <th>Father</th>
            </tr>
          </thead>

          <tbody>
            {people.map((person: Person) => {
              const {
                name,
                sex,
                born,
                died,
                fatherName,
                motherName,
                slug,
              } = person;
              const mother = people.find(
                (child) => (child.motherName === person.name),
              );
              const father = people.find(
                (child) => (child.fatherName === person.name),
              );

              return (
                <tr
                  data-cy="person"
                  className={
                    classNames(
                      { 'has-background-warning': person.slug === slugPerson },
                    )
                  }
                >
                  <td>
                    <Link
                      to={{
                        pathname: parentPath + slug,
                        search: location.search,
                      }}
                      className={classNames(
                        { 'has-text-danger': sex === 'f' },
                      )}
                    >
                      {name}
                    </Link>
                  </td>
                  <td>{sex}</td>
                  <td>{born}</td>
                  <td>{died}</td>
                  <td>
                    {mother ? (
                      <Link
                        to={{
                          pathname: parentPath + mother?.slug,
                          search: location.search,
                        }}
                        className="has-text-danger"
                      >
                        {motherName}
                      </Link>
                    ) : (
                      <p>{motherName || '-'}</p>
                    )}
                  </td>
                  <td>
                    {father ? (
                      <Link
                        to={{
                          pathname: parentPath + father?.slug,
                          search: location.search,
                        }}
                      >
                        {fatherName}
                      </Link>
                    ) : (
                      <p>{fatherName || '-'}</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
