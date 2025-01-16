import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');

  const setSearchWith = (params: SearchParams) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setSearchWith({ query: event.target.value || null });
  };

  const isResetActive = Object.values(searchParams).every(
    value => value === null,
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === null,
          })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'male',
          })}
          params={{ sex: 'male' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': searchParams.get('sex') === 'female',
          })}
          params={{ sex: 'female' }}
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
            onChange={handleQueryChange}
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
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '16',
              })}
              params={{ centure: '16' }}
            >
              16
            </SearchLink>

            <SearchLink
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '17',
              })}
              params={{ centure: '17' }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '18',
              })}
              params={{ centure: '18' }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '19',
              })}
              params={{ centure: '19' }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === '20',
              })}
              params={{ centure: '20' }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-outlined', {
                'is-success': searchParams.get('centure') === null,
              })}
              params={{ centure: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={classNames('button', 'is-outlined', 'is-fullwidth', {
            'is-success': isResetActive,
          })}
          params={{
            name: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
