import classNames from 'classnames';

import React, { useContext } from 'react';
import { SearchLink } from './SearchLink';
import { PeopleContext } from '../context/PeopleContext';
import { ORDER } from '../types/OrderEnum';

const sortValues = ['Name', 'Sex', 'Born', 'Died'];

export const PeopleSort: React.FC = () => {
  const { sort, order } = useContext(PeopleContext);

  const handleSort = (valueLink: string) => {
    const firstClick = valueLink !== sort;
    const secondClick = valueLink === sort && order === ORDER.ASC;

    if (firstClick) {
      return {
        sort: valueLink,
        order: ORDER.ASC,
      };
    }

    if (secondClick) {
      return {
        sort: valueLink,
        order: ORDER.DESC,
      };
    }

    return {
      sort: null,
      order: null,
    };
  };

  return (
    <thead>
      <tr>
        {sortValues.map((value) => {
          const normalizeValue = value.toLowerCase();

          return (
            <th key={value}>
              <span className="is-flex is-flex-wrap-nowrap">
                {value}
                <SearchLink params={handleSort(value.toLowerCase())}>
                  <span className="icon">
                    <i
                      className={classNames({
                        fas: true,
                        'fa-sort': sort !== normalizeValue,
                        'fa-sort-down':
                          sort === normalizeValue && order === ORDER.ASC,
                        'fa-sort-up':
                          sort === normalizeValue && order === ORDER.DESC,
                      })}
                    />
                  </span>
                </SearchLink>
              </span>
            </th>
          );
        })}
        <th>Mother</th>
        <th>Father</th>
      </tr>
    </thead>
  );
};
