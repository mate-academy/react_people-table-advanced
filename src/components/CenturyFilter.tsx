import React from 'react';
import { useGlobalState } from '../castomHuks/useGlobalState';
import { listOfCenturies } from '../utils/listOfCenturies';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

export const CenturyFilter: React.FC = () => {
  const { people } = useGlobalState();
  const [searchParams] = useSearchParams();
  const listOfCentury = listOfCenturies(people);
  const getCenturies = searchParams.getAll('centuries') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {listOfCentury &&
            listOfCentury.map(century => {
              const newCenturies = getCenturies.includes(century.toString())
                ? getCenturies.filter(cent => cent !== century.toString())
                : [...getCenturies, century.toString()];

              return (
                <SearchLink
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': getCenturies.includes(century.toString()),
                  })}
                  params={{ centuries: newCenturies }}
                  key={century}
                >
                  {century}
                </SearchLink>
              );
            })}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button is-success', {
              'is-outlined': searchParams.has('centuries'),
            })}
            params={{ centuries: null }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
