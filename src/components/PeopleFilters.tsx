import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const [queryInput, setQueryInput] = useState(query);

  useEffect(() => {
    setQueryInput(searchParams.get('query') || '');
  }, [searchParams]);

  useEffect(() => {
    const handler = setTimeout(() => {
      const trimmedQuery = queryInput.trim();

      if (trimmedQuery === query) {
        return;
      }

      setSearchParams(currentParams => {
        const newParams = new URLSearchParams(currentParams);

        if (!trimmedQuery) {
          newParams.delete('query');
        } else {
          newParams.set('query', trimmedQuery);
        }

        return newParams;
      });
    }, 500);

    return () => clearTimeout(handler);
  }, [queryInput, query, setSearchParams]);

  const getLinkClass = (isActive: boolean) => (isActive ? 'is-active' : '');
  const getButtonClass = (isActive: boolean) =>
    ['button', 'mr-1', isActive && 'is-info'].filter(Boolean).join(' ');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={getLinkClass(!sex)}>
          All
        </SearchLink>
        <SearchLink params={{ sex: 'm' }} className={getLinkClass(sex === 'm')}>
          Male
        </SearchLink>
        <SearchLink params={{ sex: 'f' }} className={getLinkClass(sex === 'f')}>
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
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => {
              const isSelected = centuries.includes(century);
              const nextCenturies = isSelected
                ? centuries.filter(c => c !== century)
                : [...centuries, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={getButtonClass(isSelected)}
                  params={{
                    centuries: nextCenturies.length > 0 ? nextCenturies : null,
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
