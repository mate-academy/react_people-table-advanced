import { FC } from 'react';
import classNames from 'classnames';
import {
  Link, useLocation, useResolvedPath, useSearchParams,
} from 'react-router-dom';

import { Person } from '../types';
import { SearchLink } from './SearchLink';
import { OrderEnum } from '../types/OrderEnum';
import { SortEnum } from '../types/SortEnum';
import { SexEnum } from '../types/SexEnum';

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
    if (sort === sortName && order === OrderEnum.desc) {
      return {
        sort: null,
        order: null,
      };
    }

    if (sort === sortName) {
      return {
        sort: sortName,
        order: OrderEnum.desc,
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
                    params={getQueryParams(SortEnum.name)}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'fas fa-sort',
                            {
                              'fa-sort-up':
                              sort === SortEnum.name
                              && order !== OrderEnum.asc,
                            },
                            {
                              'fa-sort-down':
                               order === OrderEnum.desc
                               && sort === SortEnum.name,
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
                    params={getQueryParams(SortEnum.sex)}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'fas fa-sort',
                            {
                              'fa-sort-up':
                              sort === SortEnum.sex && order !== OrderEnum.asc,
                            },
                            {
                              'fa-sort-down':
                              order === OrderEnum.desc
                              && sort === SortEnum.sex,
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
                    params={getQueryParams(SortEnum.born)}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'fas fa-sort',
                            {
                              'fa-sort-up':
                              sort === SortEnum.born && order !== OrderEnum.asc,
                            },
                            {
                              'fa-sort-down':
                               order === OrderEnum.desc
                               && sort === SortEnum.born,
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
                    params={getQueryParams(SortEnum.died)}
                  >
                    <span className="icon">
                      <i
                        className={
                          classNames(
                            'fas fa-sort',
                            {
                              'fa-sort-up':
                              sort === SortEnum.died && order !== OrderEnum.asc,
                            },
                            {
                              'fa-sort-down':
                               order === OrderEnum.desc
                               && sort === SortEnum.died,
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
                (p) => (p.name === motherName),
              );
              const father = people.find(
                (p) => (p.name === fatherName),
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
                        { 'has-text-danger': sex === SexEnum.female },
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
