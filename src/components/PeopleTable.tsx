import classNames from 'classnames';

import { Link, useSearchParams } from 'react-router-dom';
import React from 'react';
import { Person } from '../types';
import { PersonLink } from './PersonLink';
import { getSearchWith } from '../utils/searchHelper';

type Props = {
  people: Person[],
};

const interactiveElements = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleTable: React.FC<Props> = ({ people }) => {
  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const createSortLinkParams = (element: string) => {
    let newSort = element.toLowerCase() || null;
    let newOrder: string | null = null;

    if (sort === newSort) {
      newOrder = 'desc';
      if (order === 'desc') {
        newSort = null;
        newOrder = null;
      }
    }

    return {
      search: getSearchWith(searchParams, {
        sort: newSort,
        order: newOrder,
      }),
    };
  };

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {interactiveElements.map(element => {
            const iconClasses = classNames('fas', {
              'fa-sort-up': element.toLowerCase() === sort && !order,
              'fa-sort-down': element.toLowerCase() === sort && order,
              'fa-sort': element.toLowerCase() !== sort,
            });

            return (
              <th key={element}>
                <span className="is-flex is-flex-wrap-nowrap">
                  {element}
                  <Link to={createSortLinkParams(element)}>
                    <span className="icon">
                      <i className={iconClasses} />
                    </span>
                  </Link>
                </span>
              </th>
            );
          })}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          return (
            <PersonLink
              key={person.name}
              person={person}
              people={people}
            />
          );
        })}
      </tbody>
    </table>
  );
};
