import React from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { SearchParams } from '../utils/searchHelper';

const centuriesFilter = ['16', '17', '18', '19', '20'];

interface Props {
  setSearchWith: (params: SearchParams) => void,
}

export const PeopleFilters: React.FC<Props> = ({ setSearchWith }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const filterCenturies = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': sex === null })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
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
            {centuriesFilter.map(item => (
              <SearchLink
                key={item}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': filterCenturies.includes(item),
                })}
                params={{
                  centuries: filterCenturies.includes(item)
                    ? filterCenturies.filter(el => el !== item)
                    : [...filterCenturies, item],
                }}
              >
                {item}
              </SearchLink>
            ))}

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
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
