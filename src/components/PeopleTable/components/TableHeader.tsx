import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import {
  columnsList,
  getSortingClassName,
  updateListToShow,
  updateSortParams,
} from '../service';
import { Context } from '../../../utils/context/MainContext';

export const TableHeader: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const contextData = useContext(Context);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => updateListToShow(contextData, searchParams), [searchParams]);

  const handleSortClick = (event: React.MouseEvent) => {
    updateSortParams(event, params, setSearchParams);
    updateListToShow(contextData, searchParams);
  };

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
                        getSortingClassName(params, column),
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
