import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const CENTURIES = [16, 17, 18, 19, 20];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryValue, setQueryValue] = useState('');

  const selectedCenturies = searchParams.getAll('centuries').map(Number);
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    setQueryValue(query);
  }, [query]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trimStart();

    setQueryValue(value);

    const nextSearch = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(nextSearch);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
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
            value={queryValue}
            onChange={handleQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left is-flex is-flex-wrap-wrap">
            {CENTURIES.map(century => {
              const isActive = selectedCenturies.includes(century);
              const current = searchParams.getAll('centuries');
              const nextArr = isActive
                ? current.filter(selected => selected !== String(century))
                : [...current, String(century)];
              const nextValue = nextArr.length ? nextArr : null;

              return (
                <SearchLink
                  key={century}
                  data-cy={`century-${century}`}
                  className={cn('button mr-1 mb-1', {
                    'is-info': isActive,
                  })}
                  params={{ centuries: nextValue }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryAll"
              className={cn('button is-success is-outlined', {
                'is-info': selectedCenturies.length === 0,
              })}
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
            centuries: null,
            sex: null,
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
