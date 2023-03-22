import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person, SortType } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[];
};

const findParent = (
  array: Person[], parentName: string | null,
): Person | null => {
  return array.find(parent => parent.name === parentName) || null;
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { personId } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getNewSearch = (
    oldSort: string | null,
    oldOrder: string | null,
    field: SortType,
  ) => {
    if (oldSort === field && !oldOrder) {
      return { sort: oldSort, order: 'desc' };
    }

    if (oldSort === field && order === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: field, order: null };
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
                  search: getSearchWith(
                    searchParams, getNewSearch(sort, order, SortType.Name),
                  ),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== SortType.Name },
                    { 'fa-sort-up': sort === SortType.Name && !order },
                    {
                      'fa-sort-down': sort === SortType.Name
                    && order === 'desc',
                    },
                  )}
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
                  search: getSearchWith(
                    searchParams, getNewSearch(sort, order, SortType.Sex),
                  ),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== SortType.Sex },
                    { 'fa-sort-up': sort === SortType.Sex && !order },
                    {
                      'fa-sort-down': sort === SortType.Sex
                    && order === 'desc',
                    },
                  )}
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
                  search: getSearchWith(
                    searchParams, getNewSearch(sort, order, SortType.Born),
                  ),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== SortType.Born },
                    { 'fa-sort-up': sort === SortType.Born && !order },
                    {
                      'fa-sort-down': sort === SortType.Born
                    && order === 'desc',
                    },
                  )}
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
                  search: getSearchWith(
                    searchParams, getNewSearch(sort, order, SortType.Died),
                  ),
                }}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    { 'fa-sort': sort !== SortType.Died },
                    { 'fa-sort-up': sort === SortType.Died && !order },
                    {
                      'fa-sort-down': sort === SortType.Died
                    && order === 'desc',
                    },
                  )}
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
        {people.map(person => {
          const {
            sex,
            born,
            died,
            motherName,
            fatherName,
            slug,
          } = person;

          const mother = findParent(people, motherName);
          const father = findParent(people, fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({
                'has-background-warning': slug === personId,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>
              <td>
                {mother
                  ? <PersonLink person={mother} />
                  : motherName || '-'}
              </td>
              <td>
                {father
                  ? <PersonLink person={father} />
                  : fatherName || '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
