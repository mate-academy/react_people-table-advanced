import classNames from 'classnames';
import React, { useContext } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { Status } from '../types/sortGender';
import { SortType } from '../types/sortTypes';
import { getSearchWith } from '../utils/searchHelper';
import { sortTable } from '../utils/sortTable';
import { PeopleContext } from './PeopleContext';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable: React.FC = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const { slug } = useParams();

  const { people } = useContext(PeopleContext);

  const filteredTable =
    people &&
    sortTable(people, query, centuries, sex as Status, sort as SortType, order);

  function getOrder(item: SortType) {
    if (sort === item && order === 'desc') {
      return { sort: null, order: null };
    }

    if (sort === item) {
      return { sort: item, order: 'desc' };
    }

    return { sort: item, order: null };
  }

  const styled = (item: string) => {
    if (sort === item) {
      return { color: 'red' };
    }

    return {};
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link
                to={{
                  search: getSearchWith(searchParams, getOrder(SortType.Name)),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': people && !order && !sort,
                      'fa-sort-up': people && !order && sort,
                      'fa-sort-down': people && order && sort,
                    })}
                    style={styled(SortType.Name)}
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
                  search: getSearchWith(searchParams, getOrder(SortType.Sex)),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': people && !order && !sort,
                      'fa-sort-up': people && !order && sort,
                      'fa-sort-down': people && order && sort,
                    })}
                    style={styled(SortType.Sex)}
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
                  search: getSearchWith(searchParams, getOrder(SortType.Born)),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': people && !order && !sort,
                      'fa-sort-up': people && !order && sort,
                      'fa-sort-down': people && order && sort,
                    })}
                    style={styled(SortType.Born)}
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
                  search: getSearchWith(searchParams, getOrder(SortType.Died)),
                }}
              >
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': people && !order && !sort,
                      'fa-sort-up': people && !order && sort,
                      'fa-sort-down': people && order && sort,
                    })}
                    style={styled(SortType.Died)}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {filteredTable.length !== 0 ? (
          filteredTable.map((person: Person) => {
            const mother = person.motherName || '-';
            const father = person.fatherName || '-';

            const samePersonMother = people?.find(
              el => el.name === person.motherName,
            );

            const samePersonFather = people?.find(
              el => el.name === person.fatherName,
            );

            return (
              <tr
                data-cy="person"
                key={person.slug}
                className={classNames({
                  'has-background-warning': slug === person.slug,
                })}
              >
                <td>
                  <Link
                    to={{
                      pathname: `/people/${person.slug}`,
                      search: searchParams.toString(),
                    }}
                    className={classNames('', {
                      'has-text-danger': person.sex === 'f',
                    })}
                  >
                    {person.name}
                  </Link>
                </td>

                <td>{person.sex}</td>
                <td>{person.born}</td>
                <td>{person.died}</td>
                <td>
                  {samePersonMother ? (
                    <Link
                      to={{
                        pathname: `/people/${samePersonMother.slug}`,
                        search: searchParams.toString(),
                      }}
                      className="has-text-danger"
                    >
                      {mother}
                    </Link>
                  ) : (
                    mother
                  )}
                </td>
                <td>
                  {samePersonFather ? (
                    <Link
                      to={{
                        pathname: `/people/${samePersonFather.slug}`,
                        search: searchParams.toString(),
                      }}
                    >
                      {father}
                    </Link>
                  ) : (
                    father
                  )}
                </td>
              </tr>
            );
          })
        ) : (
          <p>There are no people matching the current search criteria</p>
        )}
      </tbody>
    </table>
  );
};
