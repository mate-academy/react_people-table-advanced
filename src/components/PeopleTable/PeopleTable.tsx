import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

import { Person } from '../../types/Person';
import { SortType } from '../../types/SortType';
import { SearchLink } from '../SearchLink';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSortParams = (sortBy: string) => {
    if (sort === sortBy && order === SortType.ORDER) {
      return { sort: null, order: null };
    }

    if (sort === sortBy) {
      return { sort: sortBy, order: SortType.ORDER };
    }

    return { sort: sortBy, order: null };
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
              <SearchLink params={getSortParams(SortType.NAME)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SortType.NAME,
                      'fa-sort-up': sort === SortType.NAME && !order,
                      'fa-sort-down': sort === SortType.NAME && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink params={getSortParams(SortType.SEX)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SortType.SEX,
                      'fa-sort-up': sort === SortType.SEX && !order,
                      'fa-sort-down': sort === SortType.SEX && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink params={getSortParams(SortType.BORN)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SortType.BORN,
                      'fa-sort-up': sort === SortType.BORN && !order,
                      'fa-sort-down': sort === SortType.BORN && order,
                    })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink params={getSortParams(SortType.DIED)}>
                <span className="icon">
                  <i
                    className={classNames('fas', {
                      'fa-sort': sort !== SortType.DIED,
                      'fa-sort-up': sort === SortType.DIED && !order,
                      'fa-sort-down': sort === SortType.DIED && order,
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
          <PersonLink key={person.slug} people={people} person={person} />
        ))}
      </tbody>
    </table>
  );
};
