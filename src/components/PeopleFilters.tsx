import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const CENTURIES = [16, 17, 18, 19, 20];
const SEX = {
  All: null,
  Male: 'm',
  Female: 'f',
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentCenturies = useCallback((century: string) => {
    const centuriesFromSearch = searchParams.getAll('centuries');

    if (!centuriesFromSearch) {
      return [century];
    }

    if (centuriesFromSearch.includes(century)) {
      return centuriesFromSearch.filter(param => param !== century);
    }

    return [...centuriesFromSearch, century];
  }, [searchParams]);

  const handleQueryChange = useCallback((text: string) => {
    if (!text.length) {
      searchParams.delete('query');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('query', text);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SEX).map(([key, value]) => (
          <SearchLink
            key={key}
            className={classNames({
              'is-active': searchParams.get('sex') === value,
            })}
            params={{ sex: value }}
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
            onChange={(event) => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': searchParams
                    .getAll('centuries')
                    .includes(century.toString()),
                })}
                params={{ centuries: getCurrentCenturies(century.toString()) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams
                  .getAll('centuries')
                  .length !== 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            centuries: null,
            sex: null,
            query: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
