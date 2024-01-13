import React from 'react';
import { Centuries } from '../types/Centuries';

type Props = {
  handleCenturyButton: (century:string) => void,
  filterCentury: Centuries[],
};

export const PeopleFilters: React.FC<Props> = ({
  handleCenturyButton, filterCentury
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">All</a>
        <a className="" href="#/people?sex=m">Male</a>
        <a className="" href="#/people?sex=f">Female</a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
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
            <a
              data-cy="century"
              className={`button mr-1 ${filterCentury.includes('16') ? 'is-info' : ''}`}
              href="#/people?centuries=16"
              onClick={() => handleCenturyButton('16')}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${filterCentury.includes('17') ? 'is-info' : ''}`}
              href="#/people?centuries=17"
              onClick={() => handleCenturyButton('17')}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${filterCentury.includes('18') ? 'is-info' : ''}`}
              href="#/people?centuries=18"
              onClick={() => handleCenturyButton('18')}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${filterCentury.includes('19') ? 'is-info' : ''}`}
              onClick={() => handleCenturyButton('19')}
              href="#/people?centuries=19"
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${filterCentury.includes('20') ? 'is-info' : ''}`}
              onClick={() => handleCenturyButton('20')}
              href="#/people?centuries=20"
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${filterCentury.length === 0 ? '' : 'is-outlined'}`}
              href="#/people"
              onClick={() => handleCenturyButton('All')}
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
