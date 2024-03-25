import React from 'react';
import cn from 'classnames';
import { SearchLink } from './SearchLink';

type Props = {
  setSearchParams: (params: URLSearchParams) => void;
  searchParams: URLSearchParams;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    const updatedSearchParams = new URLSearchParams(searchParams);

    if (newQuery === '') {
      updatedSearchParams.delete('query');
    } else {
      updatedSearchParams.set('query', newQuery);
    }

    setSearchParams(updatedSearchParams);
  };

  const handleResetAllFilters = { century: null, sex: null, query: null };

  const handleCenturies = (value: string) => {
    const centuries = searchParams.getAll('century');

    if (centuries.includes(value)) {
      const indexOfValue = centuries.indexOf(value);

      centuries.splice(indexOfValue, 1);
    } else {
      centuries.push(value);
    }

    return centuries;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !searchParams.get('sex') })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
          params={{ sex: 'f' }}
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
            value={searchParams.get('query') || ''}
            onChange={handleSearchChange}
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
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': searchParams.getAll('century').includes(century),
                })}
                params={{ century: handleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParams.getAll('century').length,
              })}
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={handleResetAllFilters}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
