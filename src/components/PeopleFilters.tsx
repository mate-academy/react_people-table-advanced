import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { centuries } from '../consts';
import { debounce } from '../utils/util';
import { useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || null);
  const sex = searchParams.get('sex') || null;
  const searchCenturies = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  const centuryALL = searchCenturies.length < centuries.length ? centuries : [];
  const updatedCenturies = (century: string) =>
    searchCenturies.includes(century)
      ? searchCenturies.filter(cent => cent !== century)
      : [...searchCenturies, century];

  const handleQuertyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    debounce(setSearchWith, 1000)({ query: e.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            value={query || ''}
            onChange={handleQuertyChange}
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
                key={century}
                params={{ centuries: updatedCenturies(century) }}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': searchCenturies.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: centuryALL }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ centuries: [], query: null, sex: null }}
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setQuery(null)}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
