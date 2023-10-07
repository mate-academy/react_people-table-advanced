import React from 'react';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../../utils/SearchLink';
import { getSearchWith } from '../../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const centuries = searchParams.getAll('centuries') || [];

  function toggleCentury(num: string) {
    return centuries.includes(num)
      ? centuries.filter(century => century !== num)
      : [...centuries, num];
  }

  // function toggleCentury(num: string) {
  //   const params = new URLSearchParams(searchParams);
  //   const newParams = centuries.includes(num)
  //     ? centuries.filter(century => century !== num)
  //     : [...centuries, num];

  //   params.delete('centuries');
  //   newParams.forEach(century => params.append('centuries', century));
  //   setSearchParams(params);
  // }

  function clearCentury() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !searchParams.get('sex') })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
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
            onChange={(event) => {
              const params = getSearchWith(
                searchParams, { query: event.target.value || null },
              );

              setSearchParams(params);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Array.from({ length: 5 }, (_, index) => {
              const century = String(index + 16);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1
                    ${centuries.includes(century) ? 'is-info' : ''
                }`}
                  params={{ centuries: toggleCentury(century) }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button mr-1', {
                'is-success': !searchParams.get('centuries'),
              })}
              params={{ centuries: [] }}
              onClick={() => clearCentury()}
            >
              All
            </SearchLink>
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
