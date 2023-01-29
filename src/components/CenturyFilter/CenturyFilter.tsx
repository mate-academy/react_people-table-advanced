import React from 'react';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';

export const CenturyFilter: React.FC = React.memo(() => {
  const [searchParams] = useSearchParams();
  const century = searchParams.getAll('century') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {[16, 17, 18, 19, 20].map(currentCentury => (
            <Link
              data-cy="century"
              className={cn(
                'button mr-1',
                { 'is-info': century.includes(String(currentCentury)) },
              )}
              to={{
                search: getSearchWith(searchParams, {
                  century: century.includes(String(currentCentury))
                    ? century.filter(curr => curr !== String(currentCentury))
                    : [...century, String(currentCentury)],
                }),
              }}
              key={currentCentury}
            >
              {currentCentury}
            </Link>
          ))}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className={cn(
              'button is-success',
              { 'is-outlined': century.length !== 0 },
            )}
            to={{ search: getSearchWith(searchParams, { century: [] }) }}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
});
