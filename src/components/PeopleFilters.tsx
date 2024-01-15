import React from 'react';
import { Centuries } from '../types/Centuries';
import { SearchLink } from './SearchLink';

type Props = {
  handleCenturyButton: (century:string) => void,
  filterCentury: Centuries[],
  handleSexLink: (sex:string) => void,
  filterSex: string,
  handleInput: (query: string) => void,
  filterQuery: string,
  handleResetButton: () => void,
};

export const PeopleFilters: React.FC<Props> = ({
  handleCenturyButton, filterCentury,
  handleSexLink, filterSex, handleInput,
  filterQuery, handleResetButton,
}) => {
  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            params={{ sex: null }}
            className={filterSex === 'All' ? 'is-active' : ''}
            onClick={() => handleSexLink('All')}
          >
            All
          </SearchLink>
          <SearchLink
            params={{ sex: 'm' }}
            className={filterSex === 'm' ? 'is-active' : ''}
            onClick={() => handleSexLink('m')}
          >
            Male
          </SearchLink>
          <SearchLink
            params={{ sex: 'f' }}
            className={filterSex === 'f' ? 'is-active' : ''}
            onClick={() => handleSexLink('f')}
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
              value={filterQuery}
              onChange={event => handleInput(event.target.value)}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              <SearchLink
                params={{
                  centuries: filterCentury.includes('16')
                    ? filterCentury.filter((c) => c !== '16')
                    : [...filterCentury, '16'],
                }}
                data-cy="century"
                className={`button mr-1 ${filterCentury.includes('16') ? 'is-info' : ''}`}
                onClick={() => handleCenturyButton('16')}
              >
                16
              </SearchLink>

              <SearchLink
                params={{
                  centuries: filterCentury.includes('17')
                    ? filterCentury.filter((c) => c !== '17')
                    : [...filterCentury, '17'],
                }}
                data-cy="century"
                className={`button mr-1 ${filterCentury.includes('17') ? 'is-info' : ''}`}
                onClick={() => handleCenturyButton('17')}
              >
                17
              </SearchLink>

              <SearchLink
                params={{
                  centuries: filterCentury.includes('18')
                    ? filterCentury.filter((c) => c !== '18')
                    : [...filterCentury, '18'],
                }}
                data-cy="century"
                className={`button mr-1 ${filterCentury.includes('18') ? 'is-info' : ''}`}
                onClick={() => handleCenturyButton('18')}
              >
                18
              </SearchLink>

              <SearchLink
                params={{
                  centuries: filterCentury.includes('19')
                    ? filterCentury.filter((c) => c !== '19')
                    : [...filterCentury, '19'],
                }}
                data-cy="century"
                className={`button mr-1 ${filterCentury.includes('19') ? 'is-info' : ''}`}
                onClick={() => handleCenturyButton('19')}
              >
                19
              </SearchLink>

              <SearchLink
                params={{
                  centuries: filterCentury.includes('20')
                    ? filterCentury.filter((c) => c !== '20')
                    : [...filterCentury, '20'],
                }}
                data-cy="century"
                className={`button mr-1 ${filterCentury.includes('20') ? 'is-info' : ''}`}
                onClick={() => handleCenturyButton('20')}
              >
                20
              </SearchLink>
            </div>

            <div className="level-right ml-4">
              <SearchLink
                params={{
                  centuries: null,
                }}
                data-cy="centuryALL"
                className={`button is-success ${filterCentury.length === 0 ? '' : 'is-outlined'}`}
                onClick={() => handleCenturyButton('All')}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>

        <div className="panel-block">
          <SearchLink
            className="button is-link is-outlined is-fullwidth"
            params={{
              centuries: null,
              sex: null,
              query: null,
              sort: null,
              order: null,
            }}
            onClick={handleResetButton}
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    </>
  );
};
