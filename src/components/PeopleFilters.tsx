import { useSearchParams } from 'react-router-dom';
import { FilterCentury } from '../types/FilterCentury';
import { FilterSex } from '../types/FilterSex';

import cn from 'classnames';
import { useCallback, useMemo } from 'react';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const sexParam = useMemo(() => searchParams.get('sex') || '', [searchParams]);
  const centutyParams = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );
  const queryParam = useMemo(
    () => searchParams.get('query') || '',
    [searchParams],
  );

  const getSelectedFilterSex = useCallback(
    (option: FilterSex) => {
      if (!option) {
        return !sexParam;
      } else {
        return option.charAt(0).toLowerCase() === sexParam;
      }
    },
    [sexParam],
  );

  const getSelectedFilterCentury = useCallback(
    (option: FilterCentury) => {
      return centutyParams.includes(option) || false;
    },
    [centutyParams],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(FilterSex).map(option => (
          <SearchLink
            params={
              !option ? { sex: null } : { sex: option.charAt(0).toLowerCase() }
            }
            className={cn({ 'is-active': getSelectedFilterSex(option) })}
            key={!option ? 'All' : option}
          >
            {option ? option : 'All'}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryParam}
            onChange={e =>
              setSearchParams(
                getSearchWith(searchParams, { query: e.target.value }),
              )
            }
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(FilterCentury).map(option => (
              <SearchLink
                params={{
                  centuries: centutyParams.includes(option)
                    ? centutyParams.filter(item => item !== option)
                    : [...centutyParams, option],
                }}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': getSelectedFilterCentury(option),
                })}
                key={option}
              >
                {option}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            ...Object.fromEntries(
              searchParams.entries().map(entry => [entry[0], null]),
            ),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
