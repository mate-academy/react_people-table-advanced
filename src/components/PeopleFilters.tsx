import React from 'react';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

interface FiltersProps {
  query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PeopleFilters: React.FC<FiltersProps> = ({
  query,
  onQueryChange,
}) => {
  const [searchParams] = useSearchParams();
  const currentCenturies = searchParams.getAll('centuries');

  return (
    <nav className="panel" data-cy="filters">
      <p className="panel-heading">Filters</p>

      {/* фільтр за статтю */}
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }}>All</SearchLink>
        <SearchLink params={{ sex: 'm' }}>Male</SearchLink>
        <SearchLink params={{ sex: 'f' }}>Female</SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            className="input"
            type="text"
            placeholder="Search"
            value={query}
            onChange={onQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => {
              const isActive = currentCenturies.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  params={{
                    centuries: isActive ? null : century,
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
              className="button is-success"
              params={{ centuries: null }}
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
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
