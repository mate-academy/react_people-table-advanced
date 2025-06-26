import React, { ChangeEvent } from 'react';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const CENTURY_FILTERS = [16, 17, 18, 19, 20];
  const SEX_FILTERS = [
    { label: 'All', value: '' },
    { label: 'Male', value: 'm' },
    { label: 'Female', value: 'f' },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function toggleCentury(century: number) {
    const hasCentury = centuries.includes(century.toString());
    let newCenturies;

    if (hasCentury) {
      newCenturies = centuries.filter(
        (currentCentury: string) => currentCentury !== century.toString(),
      );
    } else {
      newCenturies = [...centuries, century.toString()];
    }

    return { centuries: newCenturies };
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTERS.map(currentSex => {
          return (
            <SearchLink
              key={currentSex.label}
              className={cn({ 'is-active': sex === currentSex.value })}
              params={{ sex: currentSex.value }}
            >
              {currentSex.label}
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
            value={query}
            onChange={event => handleQueryChange(event)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURY_FILTERS.map(century => {
              const hasCentury = centuries.includes(century + '');

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', { 'is-info': hasCentury })}
                  params={toggleCentury(century)}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryAll"
              className={cn('button is-success', {
                'is-outlined': searchParams.getAll('centuries').length,
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
          className={cn('button is-link is-outlined is-fullwidth', {
            'is-outlined': searchParams.getAll('centuries').length,
          })}
          params={{
            centuries: null,
            query: null,
            sex: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
