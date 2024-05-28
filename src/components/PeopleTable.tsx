import React from 'react';
import { Person } from './Person';
import { PersonType } from '../types';
import classNames from 'classnames';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SortField } from '../types/SortField';

interface Props {
  people: PersonType[];
  setSearchParams: (params: URLSearchParams) => void;
  searchParams: URLSearchParams;
}

const getIconClasses = (
  sortField: SortField,
  currentSortField: SortField,
  sortOrder: string | null,
) => {
  return classNames('fas', {
    'fa-sort': currentSortField !== sortField,
    'fa-sort-up': currentSortField === sortField && sortOrder === null,
    'fa-sort-down': currentSortField === sortField && sortOrder === 'desc',
  });
};

export const PeopleTable: React.FC<Props> = ({
  people,
  setSearchParams,
  searchParams,
}) => {
  const sortField = searchParams.get('sort') || null;
  const sortOrder = searchParams.get('order') || null;

  const setSearchWith = (params: Partial<SearchParams>) => {
    const filteredParams: SearchParams = Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined)
    ) as SearchParams;

    const newSearchParams = new URLSearchParams(
      getSearchWith(searchParams, filteredParams)
    );

    setSearchParams(newSearchParams);
  };

  const handleSort = (value: SortField) => {
    if (sortField !== value) {
      setSearchWith({ sort: value });
    } else {
      if (sortOrder !== 'desc') {
        setSearchWith({ order: 'desc' });
      } else {
        setSearchWith({ sort: null, order: null });
      }
    }
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
              <a onClick={() => handleSort(SortField.Name)}>
                <span className="icon">
                  <i
                    className={getIconClasses(
                      SortField.Name,
                      sortField as SortField,
                      sortOrder,
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <a onClick={() => handleSort(SortField.Sex)}>
                <span className="icon">
                  <i
                    className={getIconClasses(
                      SortField.Sex,
                      sortField as SortField,
                      sortOrder,
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <a onClick={() => handleSort(SortField.Born)}>
                <span className="icon">
                  <i
                    className={getIconClasses(
                      SortField.Born,
                      sortField as SortField,
                      sortOrder,
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <a onClick={() => handleSort(SortField.Died)}>
                <span className="icon">
                  <i
                    className={getIconClasses(
                      SortField.Died,
                      sortField as SortField,
                      sortOrder,
                    )}
                  />
                </span>
              </a>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <Person key={person.slug} person={person} />
        ))}
      </tbody>
    </table>
  );
};
