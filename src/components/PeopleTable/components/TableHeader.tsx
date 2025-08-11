import React, { useCallback } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { columnsList, getSortingClassName } from '../utils/service';
import { updateSearchParams } from '../utils/updateSearchParams';

export const TableHeader: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortClick = useCallback(
    (event: React.MouseEvent) => {
      const params = new URLSearchParams(searchParams);

      updateSearchParams(event, params, setSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <thead>
      <tr>
        {columnsList.map(column => {
          const capitalizedColumnName =
            column[0].toUpperCase() + column.slice(1);
          const isParents = column === 'mother' || column === 'father';

          return !isParents ? (
            <th key={column}>
              <span className="is-flex is-flex-wrap-nowrap">
                {capitalizedColumnName}
                <a onClick={handleSortClick} data-sorting={column}>
                  <span className="icon">
                    <i
                      className={classNames(
                        'fas',
                        getSortingClassName(searchParams, column),
                      )}
                    />
                  </span>
                </a>
              </span>
            </th>
          ) : (
            <th key={column}>{capitalizedColumnName}</th>
          );
        })}
      </tr>
    </thead>
  );
};
