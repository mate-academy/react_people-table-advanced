import { useState } from 'react';
import { Centuries } from './Centuries';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const allCenturies = searchParams?.getAll('centuries') || [];

  const [queryParam, setQueryParam] = useState('');

  const gender = searchParams?.get('sex');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    const params = new URLSearchParams(searchParams);

    params.set('query', value);

    if (!value) {
      params.delete('query');
    }

    setQueryParam(value);
    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames('', { 'is-active': !gender })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames('', { 'is-active': gender === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames('', { 'is-active': gender === 'f' })}
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
            value={queryParam}
            onChange={handleChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(centuryItem => (
              <Centuries key={centuryItem} century={centuryItem} />
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': allCenturies.length,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setQueryParam('')}
          params={{ sex: null, centuries: [], query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
