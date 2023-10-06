import React from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { CenturyItem } from '../FilterCenturyItem';
import { PersonSexItem } from '../FilterSexItem';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../utils/searchHelper';
import { PersonSex } from '../../types';
import { CENTURIES } from '../../utils/variables';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      setSearchParams(getSearchWith(searchParams,
        { query: null }));
    } else {
      setSearchParams(getSearchWith(searchParams,
        { query: event.target.value }));
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {(Object.keys(PersonSex) as Array<keyof typeof PersonSex>)
          .map(sexValue => (
            <PersonSexItem key={sexValue} sexValue={sexValue} />
          ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={query}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
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
            {CENTURIES.map(century => (
              <CenturyItem
                key={century}
                value={century}
              />
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': !!centuries.length },
              )}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
