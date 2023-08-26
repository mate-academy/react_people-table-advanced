import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SortParams } from '../../types/SortParams';

const tableHeaderCellsData: SortParams[] = ['name', 'sex', 'born', 'died'];

export const TableHead: React.FC = () => {
  const [searchParams] = useSearchParams();

  const sort = searchParams.get('sort') || '';
  const order = searchParams.get('order') || '';

  const getSearchLink = (
    sortValue: SortParams,
  ) => {
    if (sort && sortValue !== sort) {
      return {
        search: getSearchWith(
          searchParams,
          {
            sort: sortValue,
          },
        ),
      };
    }

    if (!sort) {
      return {
        search: getSearchWith(
          searchParams,
          {
            sort: sortValue,
          },
        ),
      };
    }

    if (sort && !order) {
      return {
        search: getSearchWith(
          searchParams,
          {
            sort: sortValue,
            order: 'desc',
          },
        ),
      };
    }

    return {
      search: getSearchWith(
        searchParams,
        {
          sort: null,
          order: null,
        },
      ),
    };
  };

  return (
    <thead>
      <tr>
        {tableHeaderCellsData.map(cellData => {
          const cellTitle = cellData[0].toUpperCase() + cellData.slice(1);

          return (
            <th key={cellData}>
              <span className="is-flex is-flex-wrap-nowrap">
                {cellTitle}
                <Link to={getSearchLink(cellData)}>
                  <span className="icon">
                    <i className={cn(
                      {
                        'fas fa-sort-up': sort === cellData && !order,
                        'fas fa-sort-down': sort === cellData && order,
                        'fas fa-sort': sort !== cellData,
                      },
                    )}
                    />
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
  );
};
