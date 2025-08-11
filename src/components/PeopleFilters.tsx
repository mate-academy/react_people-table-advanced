import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { UrlSearchParams } from '../types/UrlSearchParams';

const centuriesOnPage = ['16', '17', '18', '19', '20'];

const emptyParams = {
  sex: null,
  query: null,
  centuries: null,
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(UrlSearchParams.Query) || '';
  const centuriesFromUrl = searchParams.getAll(UrlSearchParams.Centuries) || [];

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    if (e.target.value.trim().length === 0) {
      params.delete(UrlSearchParams.Query);
    } else {
      params.set(UrlSearchParams.Query, e.target.value);
    }

    setSearchParams(params);
  }

  function handleCenturiesChange(century: string) {
    return centuriesFromUrl.includes(century)
      ? centuriesFromUrl.filter(currentCentury => currentCentury !== century)
      : [...centuriesFromUrl, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({
            'is-active': !searchParams.get(UrlSearchParams.Sex),
          })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({
            'is-active': searchParams.get(UrlSearchParams.Sex) === 'm',
          })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({
            'is-active': searchParams.get(UrlSearchParams.Sex) === 'f',
          })}
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
            onChange={handleQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesOnPage.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button', 'mr-1', {
                  'is-info': centuriesFromUrl.includes(century),
                })}
                params={{ centuries: handleCenturiesChange(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button', 'is-success', {
                'is-outlined': centuriesFromUrl.length,
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
          params={emptyParams}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
