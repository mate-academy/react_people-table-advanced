import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import React from 'react';
import { SearchLink } from './SearchLink';
import { SearchParameters, Sex } from '../types';
import { isToggleCentury } from '../utils/isToggleCentury';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SearchParameters.Query) || '';
  const sex = searchParams.get(SearchParameters.Sex) || 'all';
  const centuries = searchParams.getAll(SearchParameters.Centuries) || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set(SearchParameters.Query, event.target.value);
    } else {
      params.delete(SearchParameters.Query);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(Sex).map(([option, value]) => {
          const isActive = value === Sex.All
            ? !sex
            : sex === value;
          const sexValue = value === Sex.All
            ? null
            : value;

          return (
            <SearchLink
              key={value}
              className={classNames({
                'is-active': isActive,
              })}
              params={{ sex: sexValue }}
            >
              {option}
            </SearchLink>
          );
        })}
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
            {['16', '17', '18', '19', '20'].map(century => {
              return (
                <SearchLink
                  data-cy="century"
                  className={classNames('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  key={century}
                  params={{ centuries: isToggleCentury(centuries, century) }}
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
