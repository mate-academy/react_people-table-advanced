import { useSearchParams } from 'react-router-dom';
import React from 'react';
import cn from 'classnames';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchParams } from '../../types/SearchParams';

const CENTURIES_OPTION = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SearchParams.query) || '';
  const sex = searchParams.get(SearchParams.sex) || '';
  const centuries = searchParams.getAll(SearchParams.centuries) || [];

  const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchs = getSearchWith(
      searchParams, { query: e.target.value || null },
    );

    setSearchParams(searchs);
  };

  const handleCenturyToggle = (chosenCentury: string) => {
    return {
      centuries: centuries.includes(chosenCentury)
        ? centuries.filter(century => chosenCentury !== century)
        : [...centuries, chosenCentury],
    };
  };

  const reset = () => {
    return {
      centuries: [],
      sex: null,
      query: null,
    };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
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
            value={query}
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="level is-flex-grow-1 is-mobile"
          data-cy="CenturyFilter"
        >
          <div className="level-left">
            {CENTURIES_OPTION.map(century => (
              <SearchLink
                data-cy="century"
                params={handleCenturyToggle(century)}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined ': !!centuries.length,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={reset()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
