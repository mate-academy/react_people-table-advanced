import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortType } from '../types/SortType';
import { getSortedPeople } from '../utils/helpers';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const { slug: selectedPersonSlug = '' } = useParams();

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const getNewSortParams = (
    prevSort: string | null,
    prevOrder: string | null,
    sortType: SortType,
  ) => {
    if (prevSort === sortType && !prevOrder) {
      return { sort: sortType, order: 'desc' };
    }

    if (prevSort === sortType && prevOrder === 'desc') {
      return { sort: null, order: null };
    }

    return { sort: sortType, order: null };
  };

  const sortedPeople = getSortedPeople(people, sort as SortType, order);

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
              <SearchLink
                params={getNewSortParams(sort, order, SortType.NAME)}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    {
                      'fa-sort': sort !== SortType.NAME,
                      'fa-sort-up': sort === SortType.NAME && !order,
                      'fa-sort-down': sort === SortType.NAME
                        && order === 'desc',
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getNewSortParams(sort, order, SortType.SEX)}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    {
                      'fa-sort': sort !== SortType.SEX,
                      'fa-sort-up': sort === SortType.SEX && !order,
                      'fa-sort-down': sort === SortType.SEX
                        && order === 'desc',
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getNewSortParams(sort, order, SortType.BORN)}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    {
                      'fa-sort': sort !== SortType.BORN,
                      'fa-sort-up': sort === SortType.BORN && !order,
                      'fa-sort-down': sort === SortType.BORN
                        && order === 'desc',
                    },
                  )}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getNewSortParams(sort, order, SortType.DIED)}
              >
                <span className="icon">
                  <i className={classNames(
                    'fas',
                    {
                      'fa-sort': sort !== SortType.DIED,
                      'fa-sort-up': sort === SortType.DIED && !order,
                      'fa-sort-down': sort === SortType.DIED
                        && order === 'desc',
                    },
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
        {sortedPeople.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            mother,
            father,
            slug,
          } = person;

          return (
            <tr
              data-cy="person"
              className={classNames({
                'has-background-warning': selectedPersonSlug === slug,
              })}
              key={slug}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {mother && (
                  <PersonLink person={mother} />
                )}

                {(!mother && motherName) && motherName}

                {(!mother && !motherName) && '-'}
              </td>

              <td>
                {father && (
                  <PersonLink person={father} />
                )}

                {(!father && fatherName) && fatherName}

                {(!father && !fatherName) && '-'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
