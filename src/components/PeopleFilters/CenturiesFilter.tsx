import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import FilterParam from '../../types/Filter';

const centuries = ['16', '17', '18', '19', '20'];

const CenturiesFilterBase = () => {
  const [searchParams] = useSearchParams();
  const centuriesParam = searchParams.getAll(FilterParam.Centuries);

  const getSearchWithCenturies = (century: string) => {
    if (centuriesParam.includes(century)) {
      const newCenturiesParam = centuriesParam.filter(c => c !== century);

      return getSearchWith(searchParams, {
        [FilterParam.Centuries]: [...newCenturiesParam],
      });
    } else {
      return getSearchWith(searchParams, {
        [FilterParam.Centuries]: [...centuriesParam, century],
      });
    }
  };

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {centuries.map(century => (
            <Link
              key={century}
              data-cy="century"
              className={cn('button', 'mr-1', {
                'is-info': centuriesParam.includes(century),
              })}
              to={{
                search: getSearchWithCenturies(century),
              }}
            >
              {century}
            </Link>
          ))}
        </div>

        <div className="level-right ml-4">
          <Link
            data-cy="centuryALL"
            className={cn('button', 'is-success', {
              'is-outlined': centuriesParam.length !== 0 || !centuriesParam,
            })}
            to={{
              search: getSearchWith(searchParams, {
                [FilterParam.Centuries]: null,
              }),
            }}
          >
            All
          </Link>
        </div>
      </div>
    </div>
  );
};

export const CenturiesFilter = React.memo(CenturiesFilterBase);
