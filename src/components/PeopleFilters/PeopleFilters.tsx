import React from 'react';
import { SearchLink } from '../SearchLink/SearchLink';
import classNames from 'classnames';

interface Props {
  choosedSex: string | null;
  searchedQuery: string;
  choosedCenturies: string[];
  onSexChange: (choosedSex: string | null) => void;
  onQueryChange: (searchedQuery: string) => void;
  onCenturiesToggle: (selectedCentury: string) => string[];
}

const SEX_FILTER_OPTIONS = {
  Male: 'm',
  Female: 'f',
  All: null,
};

const CENTURIES_FILTER_OPTIONS = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC<Props> = ({
  choosedSex,
  searchedQuery,
  choosedCenturies,
  onSexChange,
  onQueryChange,
  onCenturiesToggle,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SEX_FILTER_OPTIONS).map(([key, value]) => {
          return (
            <SearchLink
              key={key}
              className={classNames({
                'is-active': choosedSex === value,
              })}
              params={{ sex: value }}
              onClick={() => onSexChange(value)}
            >
              {key}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchedQuery}
            onChange={event => onQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES_FILTER_OPTIONS.map(century => {
              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': choosedCenturies.includes(century),
                  })}
                  params={{ centuries: onCenturiesToggle(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': !!choosedCenturies.length,
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
