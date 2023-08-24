import React from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

type Props = {
  sortField: string[];
  sort: string;
  order: string;
};

export const PeopleTableHeader: React.FC<Props> = ({
  sortField, sort, order,
}) => {
  const setSortType = (value: string): SearchParams => {
    if (sort === value && !order) {
      return {
        sort: value,
        order: 'desc',
      };
    }

    if (sort === value) {
      return {
        sort: null,
        order: null,
      };
    }

    return {
      sort: value,
      order: null,
    };
  };

  return (
    <thead>
      <tr>
        {sortField.map(field => (
          <th key={field}>
            <span className="is-flex is-flex-wrap-nowrap">
              {field.toUpperCase()}
              <SearchLink params={setSortType(field)}>

                <span className="icon">
                  <i className={cn('fas fa-sort', {
                    'fa-sort-up': sort === field && order !== 'desc',
                    'fa-sort-down': sort === field && order === 'desc',
                  })}
                  />
                </span>
              </SearchLink>
            </span>
          </th>
        ))}
        <th>MOTHER</th>
        <th>FATHER</th>
      </tr>
    </thead>
  );
};
