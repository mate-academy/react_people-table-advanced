import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';
import { SortField } from '../enums';

type Props = {
  people: Person[];
};

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const handleSortChange = (sortField: string) => {
    const firstClick = sort !== sortField;
    const secondClick = (sort === sortField) && !order;

    if (firstClick) {
      return {
        sort: sortField,
        order: null,
      };
    }

    if (secondClick) {
      return {
        sort,
        order: 'desc',
      };
    }

    return {
      sort: null,
      order: null,
    };
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
              <SearchLink
                params={handleSortChange(SortField.NAME)}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortField.NAME,
                    'fa-sort-up': !order && sort === SortField.NAME,
                    'fa-sort-down': order && sort === SortField.NAME,
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
                params={handleSortChange(SortField.SEX)}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortField.SEX,
                    'fa-sort-up': !order && sort === SortField.SEX,
                    'fa-sort-down': order && sort === SortField.SEX,
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
                params={handleSortChange(SortField.BORN)}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortField.BORN,
                    'fa-sort-up': !order && sort === SortField.BORN,
                    'fa-sort-down': order && sort === SortField.BORN,
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
                params={handleSortChange(SortField.DIED)}
              >
                <span className="icon">
                  <i className={classNames('fas', {
                    'fa-sort': sort !== SortField.DIED,
                    'fa-sort-up': !order && sort === SortField.DIED,
                    'fa-sort-down': order && sort === SortField.DIED,
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
        {people.map((person) => (
          <PersonLink
            people={people}
            person={person}
            key={person.slug}
          />
        ))}
      </tbody>
    </table>
  );
};
