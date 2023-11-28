import { SetURLSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

interface Props {
  searchParams: URLSearchParams,
  setSearchParams: SetURLSearchParams,
}

const filterCenturies = ['16', '17', '18', '19', '20'];

enum SexParams {
  All = '',
  Male = 'm',
  Female = 'f',
}

export const PeopleFilters: React.FC<Props> = (
  { searchParams, setSearchParams },
) => {
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');
  const centuries = searchParams.getAll('centuries');

  function handleChange(event: { target: { value: string; }; }) {
    setSearchParams(
      getSearchWith(
        searchParams,
        (event.target.value.trim())
          ? { query: event.target.value.trim().toLocaleLowerCase() }
          : { query: null },
      ),
    );
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexParams).map(([key, value]) => (
          <SearchLink
            key={key}
            params={{ sex: value || null }}
            className={classNames(
              { 'is-active': sex === value || (value === '' && sex === null) },
            )}
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
            value={query || ''}
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
            {filterCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1', { 'is-info': centuries.includes(century) },
                )}
                params={
                  {
                    centuries: centuries.includes(century)
                      ? centuries.filter(el => el !== century)
                      : [...centuries, century],
                  }
                }
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames(
                'button is-success', { 'is-outlined': centuries.length },
              )}
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
