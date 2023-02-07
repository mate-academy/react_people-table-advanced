import React, { memo } from 'react';
import classnames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink/SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

const getAllCenturies = (from: number, to: number) => {
  const centuries = [];

  for (let i = from; i <= to; i += 1) {
    centuries.push(i.toString());
  }

  return centuries;
};

const sexValues = {
  All: null,
  Male: 'm',
  Female: 'f',
};

const centuriesValues = getAllCenturies(16, 20);

export const PeopleFilters: React.FC = memo(() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith(searchParams, {
      query: event.target.value || null,
    }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(sexValues).map(([key, value]) => (
          <SearchLink
            key={value}
            params={{ sex: value }}
            className={classnames(
              { 'is-active': sex === value },
            )}
          >
            {key}
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
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesValues.map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(number => number !== century)
                    : [...centuries, century],
                }}
                data-cy="century"
                className={classnames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classnames(
                'button is-success',
                { 'is-outlined': centuries.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
});
