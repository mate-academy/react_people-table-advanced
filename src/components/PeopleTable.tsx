import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { Person } from '../types';
import { PersonTableRow } from './PersonTableRow';
import { SearchLink } from './SearchLink';

type Props = {
  people: Person[];
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const PeopleTable:React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || '';
  const currentOrder = searchParams.get('order') || '';

  const getSortParams = (sort: string) => {
    let sortToUpdate = '';
    let orderToUpdate = '';

    if (currentSort !== sort) {
      sortToUpdate = sort;
    }

    if (currentSort === sort && !currentOrder) {
      sortToUpdate = sort;
      orderToUpdate = 'desc';
    }

    return { sort: sortToUpdate || null, order: orderToUpdate || null };
  };

  const getSymbolClass = (sort: string) => {
    return classNames(
      'fas',
      {
        'fa-sort': currentSort !== sort,
        'fa-sort-up': currentSort === sort && !currentOrder,
        'fa-sort-down': currentSort === sort && !!currentOrder,
      },
    );
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
                params={getSortParams('name')}
              >
                <span className="icon">
                  <i className={getSymbolClass('name')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Sex
              <SearchLink
                params={getSortParams('sex')}
              >
                <span className="icon">
                  <i className={getSymbolClass('sex')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Born
              <SearchLink
                params={getSortParams('born')}
              >
                <span className="icon">
                  <i className={getSymbolClass('born')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>
            <span className="is-flex is-flex-wrap-nowrap">
              Died
              <SearchLink
                params={getSortParams('died')}
              >
                <span className="icon">
                  <i className={getSymbolClass('died')} />
                </span>
              </SearchLink>
            </span>
          </th>

          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map((person) => {
          const {
            slug,
            fatherName,
            motherName,
          } = person;

          const mother = people
            .find((p) => p.name === motherName);
          const father = people
            .find((p) => p.name === fatherName);

          return (
            <PersonTableRow
              key={slug}
              person={{
                ...person,
                mother,
                father,
              }}
            />
          );
        })}
      </tbody>
    </table>
  );
};
