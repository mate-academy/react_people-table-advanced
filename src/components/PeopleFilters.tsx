import React, { useEffect } from 'react';
import { SetURLSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import { Centuries } from '../types/Centuries';
import { SexFilter } from '../types/SexFilter';

type Props = {
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
}) => {
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newParams = getSearchWith(
      searchParams, { query: e.target.value || null },
    );

    setSearchParams(newParams);
  };

  useEffect(() => {
    searchParams.set('sex', 'null');
  }, []);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SexFilter.map(({ title, value }) => (
          <SearchLink
            params={{
              sex: value,
            }}
            className={cn(
              { 'is-active': value === sex },
            )}
          >
            {title}
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
            value={query}
            onChange={e => handleQueryChange(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Centuries.map(century => (
              <SearchLink
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                data-cy="century"
                className={cn(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-outlined',
                'is-success',
              )}
              params={{
                centuries: null,
              }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            sex: null,
            query: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
