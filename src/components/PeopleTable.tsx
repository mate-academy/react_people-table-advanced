import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { PersonLink } from './PersonLink';
import { Person } from '../types';
import React, { useCallback } from 'react';
import { SearchLink } from './SearchLink';

/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  people: Person[] | null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: slugParams } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = useCallback(
    (sortBy: string) => {
      if (sortBy === sort && order === 'desc') {
        return { sort: null, order: null };
      }

      if (sortBy === sort && !order) {
        return { sort: sortBy, order: 'desc' };
      }

      return { sort: sortBy, order: null };
    },
    [sort, order],
  );

  const sortedPeople = React.useMemo(() => {
    if (!sort) {
      return people;
    }

    if (!people) {
      return [];
    }

    return [...people].sort((firstPerson, secondPerson) => {
      switch (sort) {
        case 'name':
          return order === 'desc'
            ? secondPerson.name.localeCompare(firstPerson.name)
            : firstPerson.name.localeCompare(secondPerson.name);
        case 'sex':
          return order === 'desc'
            ? secondPerson.sex.localeCompare(firstPerson.sex)
            : firstPerson.sex.localeCompare(secondPerson.sex);
        case 'born':
          return order === 'desc'
            ? secondPerson.born - firstPerson.born
            : firstPerson.born - secondPerson.born;
        case 'died':
          return order === 'desc'
            ? secondPerson.died - firstPerson.died
            : firstPerson.died - secondPerson.died;
        default:
          return 0;
      }
    });
  }, [people, sort, order]);

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
              <SearchLink params={getSortParams('name')}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': 'name' !== sort },
                      { 'fa-sort-up': 'name' === sort && !order },
                      { 'fa-sort-down': 'name' === sort && order },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams('sex')}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': 'sex' !== sort },
                      { 'fa-sort-up': 'sex' === sort && !order },
                      { 'fa-sort-down': 'sex' === sort && order },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams('born')}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': 'born' !== sort },
                      { 'fa-sort-up': 'born' === sort && !order },
                      { 'fa-sort-down': 'born' === sort && order },
                    )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams('died')}>
                <span className="icon">
                  <i
                    className={classNames(
                      'fas',
                      { 'fa-sort': 'died' !== sort },
                      { 'fa-sort-up': 'died' === sort && !order },
                      { 'fa-sort-down': 'died' === sort && order },
                    )}
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
        {sortedPeople &&
          sortedPeople?.map(person => {
            const {
              born,
              died,
              sex,
              fatherName,
              motherName,
              slug,
              father,
              mother,
            } = person;

            return (
              <tr
                key={slug}
                data-cy="person"
                className={classNames({
                  'has-background-warning': slug === slugParams,
                })}
              >
                <td>
                  <PersonLink person={person} />
                </td>

                <td>{sex}</td>
                <td>{born}</td>
                <td>{died}</td>
                <td>
                  {mother ? (
                    <PersonLink person={mother} />
                  ) : (
                    <>{motherName ? motherName : '-'}</>
                  )}
                </td>

                <td>
                  {father ? (
                    <PersonLink person={father} />
                  ) : (
                    <>{fatherName ? fatherName : '-'}</>
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
