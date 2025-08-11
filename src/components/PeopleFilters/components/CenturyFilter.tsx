import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import React, { useCallback } from 'react';
import { getSearchWith } from '../../../utils/searchHelper';
import { updateSearchParams } from '../../PeopleTable/utils/updateSearchParams';

const centuryFilters = [16, 17, 18, 19, 20];

export const CenturyFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCenturyFilterClick = useCallback(
    (event: React.MouseEvent) => {
      const params = new URLSearchParams(searchParams);

      updateSearchParams(event, params, setSearchParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuryFilters.map(filter => {
            const centurySearchURLs = searchParams.getAll('centuries');
            const isHighlighted = centurySearchURLs.includes(filter.toString());

            return (
              <a
                key={filter}
                data-cy="century"
                data-century={filter}
                className={classNames('button', { 'is-info': isHighlighted })}
                onClick={handleCenturyFilterClick}
              >
                {filter}
              </a>
            );
          })}
        </div>

        <div className="level-right ml-4">
          <a
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': searchParams.has('centuries'),
            })}
            onClick={() =>
              setSearchParams(getSearchWith(searchParams, { centuries: null }))
            }
          >
            All
          </a>
        </div>
      </div>
    </div>
  );
};
