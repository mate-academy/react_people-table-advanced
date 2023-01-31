import classNames from 'classnames';
import React, { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

enum SexFilter {
  All = 'all',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const currentSexFilter = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const isActive = (sexFilter: SexFilter | string) => {
    return sexFilter === currentSexFilter;
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (!value) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', event.target.value);
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': isActive('') })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': isActive(SexFilter.Male) })}
          params={{
            sex: currentSexFilter === SexFilter.Male
              ? currentSexFilter
              : SexFilter.Male,
          }}

        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': isActive(SexFilter.Female) })}
          params={{
            sex: currentSexFilter === SexFilter.Female
              ? currentSexFilter
              : SexFilter.Female,
          }}
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
            onChange={onInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(number => number !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button',
                'is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
