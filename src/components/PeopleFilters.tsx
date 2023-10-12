import React from 'react';
import classNames from 'classnames';
import { CENTURIES_NUMBERS, GenderStatus } from '../utils/constans';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { SearchOptions } from '../utils/SearchOptions';

type Props = {
  query: string;
  setSerchParams: (v: URLSearchParams | string) => void;
  searchParams: URLSearchParams;
  centuries: string[];
  sex: string;
};

export const PeopleFilters: React.FC<Props> = ({
  query,
  setSerchParams,
  searchParams,
  centuries,
  sex,
}) => {
  function centuryToggle(century: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));
    setSerchParams(params);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSerchParams(
      getSearchWith(searchParams, {
        [SearchOptions.Query]: event.target.value || null,
      }),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames(
            { 'is-active': !sex },
          )}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames(
            { 'is-active': sex === GenderStatus.Male },
          )}
          params={{ sex: GenderStatus.Male }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames(
            { 'is-active': sex === GenderStatus.Female },
          )}
          params={{ sex: GenderStatus.Female }}
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
            value={query}
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
            {CENTURIES_NUMBERS.map(century => {
              const isCenturyIncluded = centuries.includes(century);
              const updatedCenturies = isCenturyIncluded
                ? centuries.filter(cent => cent !== century)
                : [...centuries, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(century) },
                  )}
                  onClick={() => centuryToggle(century)}
                  params={{
                    centuries: updatedCenturies,
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{
            [SearchOptions.Centuries]: [],
            [SearchOptions.Sex]: null,
            [SearchOptions.Query]: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
