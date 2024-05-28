import React, { useEffect, useState } from 'react';
import { FilterBy } from '../types/FilterBy';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

interface Props {
  searchParams: URLSearchParams;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  activeQuery: string;
  toggleCenturies: (currentCentury: number) => string[];
  activeCenturies: string[];
}

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setQuery,
  setSearchParams,
  activeQuery,
  toggleCenturies,
  activeCenturies,
}) => {
  const [activeFilter, setActiveFilter] = useState('');
  const centuries: number[] = [16, 17, 18, 19, 20];

  useEffect(() => {
    setActiveFilter(searchParams.get('sex') || '');
    setQuery(searchParams.get('query') || '');
  }, [searchParams, setQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (e.target.value === '') {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', e.target.value);
    }

    setSearchParams(newSearchParams);
  };

  const handleReset = () => {
    setQuery('');
    setActiveFilter('');
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': activeFilter === '' })}
          href="#/people"
        >
          {FilterBy.All}
        </a>
        <a
          className={classNames({ 'is-active': activeFilter === 'm' })}
          href="#/people?sex=m"
        >
          {FilterBy.Male}
        </a>
        <a
          className={classNames({ 'is-active': activeFilter === 'f' })}
          href="#/people?sex=f"
        >
          {FilterBy.Female}
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
            className="input"
            placeholder="Search"
            value={activeQuery}
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
            {centuries.map(century => (
              <SearchLink
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': activeCenturies.includes(`${century}`),
                })}
                key={century}
                params={{ centuries: toggleCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!activeCenturies.length,
              })}
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
          onClick={handleReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
