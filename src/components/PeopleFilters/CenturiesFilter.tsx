import classNames from 'classnames';
import { AVAILABLE_CENTURIES, FilterSearchParams } from '../../types/Filter';
import { SearchLink } from '../SearchLink';
import { createArrayOfSearchParams } from '../PeopleFilters';
import { useSearchParams } from 'react-router-dom';

export const CenturiesFilter = () => {
  const [searchParams] = useSearchParams();
  const centuries =
    (searchParams.getAll('centuries') as FilterSearchParams['centuries']) || [];

  return (
    <div className="panel-block">
      <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
        <div className="level-left">
          {AVAILABLE_CENTURIES.map(century => (
            <SearchLink
              key={century}
              data-cy="century"
              className={classNames('button', 'mr-1', {
                'is-info': centuries.includes(century),
              })}
              params={{
                centuries: createArrayOfSearchParams(centuries, century),
              }}
            >
              {century}
            </SearchLink>
          ))}
        </div>

        <div className="level-right ml-4">
          <SearchLink
            data-cy="centuryALL"
            className={classNames('button', 'is-success', {
              'is-outlined': centuries.length > 0,
            })}
            params={{
              centuries: [],
            }}
          >
            All
          </SearchLink>
        </div>
      </div>
    </div>
  );
};
