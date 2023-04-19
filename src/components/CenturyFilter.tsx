import { useSearchParams } from 'react-router-dom';

import classNames from 'classnames';

import { SearchLink } from './SearchLink';

import { checkStateCenturies } from '../utils/filterHelpers';

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {['16', '17', '18', '19', '20'].map(age => (
            <SearchLink
              key={age}
              data-cy="century"
              className={classNames(
                'button',
                'mr-1',
                { 'is-info': centuries.includes(age) },
              )}
              params={{ centuries: checkStateCenturies(centuries, age) }}
            >
              {age}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryAll"
            className={classNames(
              'button',
              'is-success',
              { 'is-outlined': centuries.length },
            )}
            params={{ centuries: [] }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
