import React, { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries') || [];

  const centuries = ['16', '17', '18', '19', '20'];

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value.trimStart() || null;

    const preparedSearchQuery = getSearchWith(
      searchParams,
      {
        query: currentValue,
      },
    );

    setSearchParams(preparedSearchQuery);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': currentSex === null })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': currentSex === 'm' })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': currentSex === 'f' })}
          params={{
            sex: 'f',
          }}
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
            value={currentQuery}
            onChange={handleChangeName}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => (
              <SearchLink
                className={cn(
                  'button mr-1',
                  { 'is-info': currentCenturies.includes(century) },
                )}
                key={century}
                params={{
                  centuries: currentCenturies.includes(century)
                    ? currentCenturies.filter(c => c !== century)
                    : [...currentCenturies, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              className={cn(
                'button is-success',
                { 'is-outlined': currentCenturies.length !== 0 },
              )}
              params={{
                centuries: null,
              }}
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
            query: null,
            sex: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
