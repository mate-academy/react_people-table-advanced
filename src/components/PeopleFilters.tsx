import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';
import { SearchLink } from './SearchLink';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries');
  const currentSexSort = searchParams.get('sex');

  const setSearchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', event.target.value);
    }

    setSearchParams(searchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!currentSexSort ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={currentSexSort === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={currentSexSort === 'f' ? 'is-active' : ''}
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
            value={searchParams.get('query') || ''}
            onChange={setSearchQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(cent => (
              <SearchLink
                key={cent}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(cent),
                })}
                params={
                  {
                    centuries: centuries.includes(cent)
                      ? centuries.filter(item => item !== cent)
                      : [...centuries, cent],
                  }
                }
              >
                {cent}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
