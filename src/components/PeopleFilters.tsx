import classNames from 'classnames';
import React from 'react';

interface Props {
  sexFilter: 'm' | 'f' | null;
  setSexFilter: (sex: 'm' | 'f' | null) => void;
  queryFilter: string;
  setQueryFilter: (value: string) => void;
  toggleCentury: (arg: number) => void;
  clearCenturies: () => void;
  centuryFilter: number[];
  resetAll: () => void;
}

export const PeopleFilters: React.FC<Props> = ({
  sexFilter,
  setSexFilter,
  queryFilter,
  setQueryFilter,
  toggleCentury,
  centuryFilter,
  clearCenturies,
  resetAll,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !sexFilter })}
          onClick={() => setSexFilter(null)}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sexFilter === 'm' })}
          onClick={() => setSexFilter('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sexFilter === 'f' })}
          onClick={() => setSexFilter('f')}
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
            value={queryFilter}
            onChange={e => setQueryFilter(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <button
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuryFilter.includes(century),
                })}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
