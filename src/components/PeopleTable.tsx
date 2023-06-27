import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { SearchLink } from './SearchLink';

interface Props {
  people: Person[],
}

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sorting = searchParams.get('sort') || null;
  const order = searchParams.get('order') || null;

  const sortingAndOrdering = (
    sort: string | null,
    ordering: string | null,
    sortName: string | null,
  ) => {
    if (sort !== sortName) {
      return { sort: sortName, order: null };
    }

    if (!sort && !ordering) {
      return { sort: sortName, order: null };
    }

    if (sort && !ordering) {
      return { sort: sortName, order: 'desc' };
    }

    return { sort: null, order: null };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>
            Name
            <SearchLink
              params={sortingAndOrdering(sorting, order, 'name')}
            >
              <span className="icon">
                <i
                  className={classNames('fas fa-sort', {
                    'fa-sort-up': sorting === 'name' && !order,
                    'fa-sort-down': sorting === 'name' && order,
                  })}
                />
              </span>
            </SearchLink>
          </th>
          <th>
            Sex
            <SearchLink
              params={sortingAndOrdering(sorting, order, 'sex')}
            >
              <span className="icon">
                <i
                  className={classNames('fas fa-sort', {
                    'fa-sort-up': sorting === 'sex' && !order,
                    'fa-sort-down': sorting === 'sex' && order,
                  })}
                />
              </span>
            </SearchLink>
          </th>
          <th>
            Born
            <SearchLink
              params={sortingAndOrdering(sorting, order, 'born')}
            >
              <span className="icon">
                <i
                  className={classNames('fas fa-sort', {
                    'fa-sort-up': sorting === 'born' && !order,
                    'fa-sort-down': sorting === 'born' && order,
                  })}
                />
              </span>
            </SearchLink>
          </th>
          <th>
            Died
            <SearchLink
              params={sortingAndOrdering(sorting, order, 'died')}
            >
              <span className="icon">
                <i
                  className={classNames('fas fa-sort', {
                    'fa-sort-up': sorting === 'died' && !order,
                    'fa-sort-down': sorting === 'died' && order,
                  })}
                />
              </span>
            </SearchLink>
          </th>
          <th>
            Mother
          </th>
          <th>
            Father
          </th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <PersonLink person={person} people={people} />
        ))}
      </tbody>
    </table>
  );
};
