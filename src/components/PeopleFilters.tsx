import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChangeQuery = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newSearchParams = searchParams.toString();

      if (event.target.value) {
        newSearchParams = getSearchWith(searchParams,
          { query: event.target.value });
      } else {
        newSearchParams = getSearchWith(searchParams, { query: null });
      }

      navigate({ search: newSearchParams });
    },
    [searchParams, navigate],
  );

  const sexParam = searchParams.get('sex');
  const allCenturies = searchParams.getAll('centuries');
  const queryParam = searchParams.get('query') || '';

  const addCenturies = (centurie: string) => {
    if (allCenturies.includes(centurie)) {
      return [...allCenturies.filter(el => el !== centurie)];
    }

    return [...allCenturies, centurie];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': sexParam === null })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sexParam === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sexParam === 'f' })}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={queryParam}
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('16') })}
              params={{ centuries: addCenturies('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('17') })}
              params={{ centuries: addCenturies('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('18') })}
              params={{ centuries: addCenturies('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('19') })}
              params={{ centuries: addCenturies('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1',
                { 'is-info': allCenturies.includes('20') })}
              params={{ centuries: addCenturies('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success is-filled',
                { 'is-outlined': allCenturies.length > 0 })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={cn('button is-link is-outlined is-fullwidth')}
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
