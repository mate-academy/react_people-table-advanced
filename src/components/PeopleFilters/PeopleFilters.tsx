import React from 'react';
import cn from 'classnames';
import { CENTURIES_FILTERS, SEX_FILTERS } from '../../constants';

interface Props {
  sex: string;
  query: string;
  centuries: string[];
  onResetParam: (param: string) => void;
  onSexChange: (sexFilter: string) => void;
  toggleCenturies: (century: string) => void;
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PeopleFilters: React.FC<Props> = ({
  sex,
  query,
  centuries,
  onSexChange,
  onResetParam,
  onQueryChange,
  toggleCenturies,
}) => {
  const handleResetAll = () => {
    onResetParam('sex');
    onResetParam('query');
    onResetParam('centuries');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTERS.map(filter => (
          <a
            key={filter.title}
            className={cn({ 'is-active': sex === filter.param })}
            onClick={() => onSexChange(filter.param)}
          >
            {filter.title}
          </a>
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
            onChange={onQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_FILTERS.map(filter => (
              <a
                key={filter}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(filter),
                })}
                onClick={() => toggleCenturies(filter)}
              >
                {filter}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => onResetParam('centuries')}
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
          onClick={handleResetAll}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
