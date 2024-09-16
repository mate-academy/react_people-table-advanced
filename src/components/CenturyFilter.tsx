import cn from 'classnames';

import { useSearchParams } from 'react-router-dom';

import { PeopleFilter } from '../types/enums';

import { SearchLink } from './SearchLink';

export const CenturyFilter: React.FC = () => {
  const [searchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];

  const toggleCentury = (centuryStr: string) => {
    return centuries.includes(centuryStr)
      ? centuries.filter(century => century !== centuryStr)
      : [...centuries, centuryStr];
  };

  return (
    <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
      <div className="level-left">
        {Array.from({ length: 5 }, (_, index) => index + 16).map(century => (
          <SearchLink
            key={century}
            data-cy="century"
            params={{ centuries: toggleCentury(String(century)) }}
            className={cn('button mr-1', {
              'is-info': centuries.includes(String(century)),
            })}
          >
            {century}
          </SearchLink>
        ))}
      </div>

      <div className="level-right ml-4">
        <SearchLink
          data-cy="centuryALL"
          className={cn('button', 'is-success', {
            'is-outlined': !!centuries.length,
          })}
          params={{ centuries: null }}
        >
          {PeopleFilter.All}
        </SearchLink>
      </div>
    </div>
  );
};
