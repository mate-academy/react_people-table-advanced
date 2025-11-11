import React from 'react';
import { Link } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';

interface CenturyFilterProps {
  searchParams: URLSearchParams;
}

export const CenturyFilter: React.FC<CenturyFilterProps> = ({
  searchParams,
}) => {
  const centuries = searchParams.getAll('centuries');
  const ALLOWED_CENTURIES = ['16', '17', '18', '19', '20'];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {ALLOWED_CENTURIES.map(century => (
            <Link
              key={century}
              data-cy="century"
              className={classNames('button mr-1', {
                'is-info': centuries.includes(century),
              })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: centuries.includes(century)
                    ? centuries.filter(cn => century !== cn)
                    : [...centuries, century],
                }),
              }}
              replace
            >
              {+century}
            </Link>
          ))}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className="button is-success is-outlined"
            to={{
              search: getSearchWith(searchParams, { centuries: null }),
            }}
            replace
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};
