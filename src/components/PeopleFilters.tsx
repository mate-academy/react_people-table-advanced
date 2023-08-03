import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

function prepareCentries(centuries: string[], clickedCentery: string) {
  return centuries.includes(clickedCentery)
    ? centuries.filter(century => century !== clickedCentery)
    : [...centuries, clickedCentery];
}

const sexOptions = [
  { title: 'All', value: null },
  { title: 'Male', value: 'm' },
  { title: 'Female', value: 'f' },
];

const centuryOptions = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || null;

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const search = getSearchWith(
      searchParams,
      { query: event.target.value.trim() || null },
    );

    setSearchParams(search);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexOptions.map(option => (
          <SearchLink
            key={option.value}
            className={cn({
              'is-active': sex === option.value,
            })}
            params={{ sex: option.value }}
          >
            {option.title}
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
            {centuryOptions.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: prepareCentries(centuries, century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length === 0,
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
          className="button is-Link is-outlined is-fullwidth"
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
