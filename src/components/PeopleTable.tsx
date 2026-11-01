import React from 'react';
import type { Person } from '../types/Person';
import { PersonRow } from './PersonRow';
import { Link, useSearchParams } from 'react-router-dom';
import { SortOrder, SortParams } from '../types/SortParams';
import cn from 'classnames';

type Props = {
  persons: Person[];
  selectedPersonSlug?: string;
};

export const PeopleTable: React.FC<Props> = ({
  persons,
  selectedPersonSlug,
}) => {
  const [searchParams] = useSearchParams();

  const handleSort = (sortParam: SortParams) => {
    const newSearchParams = new URLSearchParams(searchParams);
    const searchByParams = newSearchParams.get('sort');

    if (!searchByParams || searchByParams !== sortParam) {
      newSearchParams.set('sort', sortParam);
      newSearchParams.delete('order');

      return newSearchParams;
    }

    const currentOrder = newSearchParams.get('order');

    if (!currentOrder) {
      newSearchParams.set('order', SortOrder.Desc);

      return newSearchParams;
    }

    newSearchParams.delete('sort');
    newSearchParams.delete('order');

    return newSearchParams;
  };

  return (
    <table
      data-cy="peopleTable"
      className={'table is-striped ' + 'is-hoverable is-narrow is-fullwidth'}
    >
      <thead>
        <tr>
          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Name
              <Link to={{ search: handleSort(SortParams.Name).toString() }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort-up':
                        searchParams.get('sort') === SortParams.Name &&
                        !searchParams.get('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === SortParams.Name &&
                        searchParams.get('order') === SortOrder.Desc,
                      'fa-sort': searchParams.get('sort') !== SortParams.Name,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <Link to={{ search: handleSort(SortParams.Sex).toString() }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort-up':
                        searchParams.get('sort') === SortParams.Sex &&
                        !searchParams.get('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === SortParams.Sex &&
                        searchParams.get('order') === SortOrder.Desc,
                      'fa-sort': searchParams.get('sort') !== SortParams.Sex,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <Link to={{ search: handleSort(SortParams.Born).toString() }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort-up':
                        searchParams.get('sort') === SortParams.Born &&
                        !searchParams.get('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === SortParams.Born &&
                        searchParams.get('order') === SortOrder.Desc,
                      'fa-sort': searchParams.get('sort') !== SortParams.Born,
                    })}
                  />
                </span>
              </Link>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <Link to={{ search: handleSort(SortParams.Died).toString() }}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort-up':
                        searchParams.get('sort') === SortParams.Died &&
                        !searchParams.get('order'),
                      'fa-sort-down':
                        searchParams.get('sort') === SortParams.Died &&
                        searchParams.get('order') === SortOrder.Desc,
                      'fa-sort': searchParams.get('sort') !== SortParams.Died,
                    })}
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
        {persons.map(person => {
          return (
            <PersonRow
              person={person}
              isSelected={person.slug === selectedPersonSlug}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
