import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchParams } from '../../types/SearchParams';
import { PersonSex } from '../../types/personSex';
import { getSearchWith } from '../../utils/searchHelper';
import classNames from 'classnames';
import { SearchLink } from '../SearchLink';
import { CenturyForSearch } from '../../types/CenturyForSearch';

type Props = {};

export const PeopleFilters: React.FC<Props> = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get(SearchParams.QUERY) || '';
  const sex = searchParams.get(SearchParams.SEX) || PersonSex.ALL;
  const centuries = searchParams.getAll(SearchParams.CENTURIES) || [];

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const newQuery = event.target.value || null;

    if (newQuery) {
      params.set(SearchParams.QUERY, newQuery);
    } else {
      params.delete(SearchParams.QUERY);
    }

    setSearchParams(getSearchWith(params, { query: newQuery }));
  };

  const handleCenturyOfBirth = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(cent => cent !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(PersonSex).map(([key, value]) => (
          <SearchLink
            key={key}
            className={classNames({
              'is-active': sex === value,
            })}
            params={{
              sex: value,
            }}
          >
            {key}
          </SearchLink>
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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(CenturyForSearch).map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: handleCenturyOfBirth(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length,
              })}
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
            centuries: null,
            sex: null,
            query: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
