import React, { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const gender = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const century = searchParams.getAll('century') || [];

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value || null;

    setSearchParams(
      getSearchWith(searchParams, { query: newQuery }),
    );
  };

  const onCenturyChange = (cent: string) => {
    if (century.includes(cent)) {
      const updatedCentury = century.filter(curCentury => curCentury !== cent);

      return { century: updatedCentury };
    }

    return { century: [...century, cent] };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': gender === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': gender === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': gender === 'f' })}
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
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(cent => (
              <SearchLink
                data-cy="century"
                className={cn('button mr-1',
                  { 'is-info': century.includes(cent) })}
                params={onCenturyChange(cent)}
              >
                {cent}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success',
                { 'is-outlined': century.length !== 0 })}
              params={{ century: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ query: null, sex: null, century: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
});
