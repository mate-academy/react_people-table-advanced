import React from 'react';
import { Centuries } from '../types/Centuries';

type Props = {
  handleCenturyButton: (century:string) => void,
  filterCentury: Centuries[],
  handleSexLink: (sex:string) => void,
  filterSex: string,
  handleInput: (query: string) => void,
  filterQuery: string,
};

export const PeopleFilters: React.FC<Props> = ({
  handleCenturyButton, filterCentury,
  handleSexLink, filterSex, handleInput,
  filterQuery,
}) => {
  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={filterSex === 'All' ? 'is-active' : ''}
          href="#/people"
          onClick={() => handleSexLink('All')}
        >
          All
        </a>
        <a
          className={filterSex === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={() => handleSexLink('m')}
        >
          Male
        </a>
        <a
          className={filterSex === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
          onClick={() => handleSexLink('f')}
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
            value={filterQuery}
            onChange={event => handleInput(event.target.value)}
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
