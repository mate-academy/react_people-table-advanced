import { useSearchParams } from 'react-router-dom';
import React, { useState } from 'react';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries' || []);
  const [input, setInput] = useState('');

  function handleFilterInput(event: React.ChangeEvent<HTMLInputElement>) {
    const search = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setInput(event.target.value);

    setSearchParams(search);
  }

  function toggleCenturies(ch: string): string[] {
    return centuries.includes(ch)
      ? centuries.filter(century => century != ch)
      : [...centuries, ch];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={searchParams.get('sex') == null ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={searchParams.get('sex') == 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={searchParams.get('sex') == 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={input}
            onChange={handleFilterInput}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: toggleCenturies(century),
                }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success ', {
                'is-outlined': !!centuries.length,
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
          className="button is-link is-outlined is-fullwidth"
          params={{ centuries: null, query: null, sex: null }}
          onClick={() => setInput('')}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
