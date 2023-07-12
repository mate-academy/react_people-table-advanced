import classNames from 'classnames';
import React from 'react';

interface Props {
  query: string;
  setQuery: CallableFunction;
  onReset: CallableFunction;
  gender: string;
  handleGenderFilter: CallableFunction;
}

export const PeopleFilters: React.FC<Props> = ({
  query,
  setQuery,
  gender,
  handleGenderFilter,
  onReset,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({
            'is-active': gender === 'all',
          })}
          href="#/people"
          onClick={() => handleGenderFilter('all')}
        >
          All
        </a>

        <a
          className={classNames({
            'is-active': gender === 'm',
          })}
          href="#/people?sex=m"
          onClick={() => handleGenderFilter('m')}
        >
          Male
        </a>
        <a
          className={classNames({
            'is-active': gender === 'f',
          })}
          href="#/people?sex=f"
          onClick={() => handleGenderFilter('f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=16"
            >
              16
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=17"
            >
              17
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=18"
            >
              18
            </a>

            <a
              data-cy="century"
              className="button mr-1 is-info"
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className="button mr-1"
              href="#/people?centuries=20"
            >
              20
            </a>
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
          onClick={() => onReset()}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
