import React from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newSearch = getSearchWith(searchParams, {
      query: value || null,
    });

    setSearchParams(newSearch);
  };

  const handleCenturyToggle = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    const newSearch = getSearchWith(searchParams, {
      centuries: newCenturies.length ? newCenturies : null,
    });

    setSearchParams(newSearch);
  };

  const availableCenturies = ['16', '17', '18', '19', '20'];

  return (
    <div className="panel">
      <p className="panel-heading">Filters</p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="text"
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
        <div className="buttons has-addons">
          <SearchLink
            data-cy="FilterSexAll"
            to=""
            params={{ sex: null }}
            className={classNames('button', { 'is-link': !sex })}
          >
            All
          </SearchLink>
          <SearchLink
            data-cy="FilterSexMale"
            to=""
            params={{ sex: 'm' }}
            className={classNames('button', { 'is-link': sex === 'm' })}
          >
            Male
          </SearchLink>
          <SearchLink
            data-cy="FilterSexFemale"
            to=""
            params={{ sex: 'f' }}
            className={classNames('button', { 'is-link': sex === 'f' })}
          >
            Female
          </SearchLink>
        </div>
      </div>

      <div className="panel-block">
        <div className="buttons">
          {availableCenturies.map(century => (
            <button
              key={century}
              data-cy="CenturyFilter"
              type="button"
              className={classNames('button', {
                'is-info': centuries.includes(century),
              })}
              onClick={() => handleCenturyToggle(century)}
            >
              {century}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          data-cy="FilterReset"
          to=""
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </div>
  );
};
