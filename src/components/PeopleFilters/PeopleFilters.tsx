import { useSearchParams } from 'react-router-dom';

import { SearchLink } from "../SearchLink";
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const resetParams = {
    sex:  null,
    query:  null,
    centuries:  null,
    sort: null,
    order:  null,
  };
  const isAllActive = centuries.length === 0;
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('query', value)
    } else {
      params.delete('query')
    }
    setSearchParams(params)
  }
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className={!sex ? 'is-active' : ''} params={{sex: null}}>
          All
        </SearchLink>
        <SearchLink className={sex === 'm' ? 'is-active' : ''} params={{sex: 'm'}}>
          Male
        </SearchLink>
        <SearchLink className={sex === 'f' ? 'is-active' : ''} params={{sex: 'f'}}>
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
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16,17,18,19,20].map((c) => {
              const value = String(c);
              const isActive = centuries.includes(String(c));

              const nextCenturies = isActive
                ? centuries.filter(cent => cent !== value)
                : [...centuries, value]

              return <SearchLink
                key={c}
                data-cy="century"
                className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                params={{centuries: nextCenturies.length ? nextCenturies : null}}
              >
                {c}
              </SearchLink>
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success is-outlined ${
                isAllActive
                  ? 'is-active'
                  : ''
              }`}
              params={{centuries: null}}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink className="button is-link is-outlined is-fullwidth" params={resetParams}>
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};