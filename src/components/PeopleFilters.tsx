import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchLink } from './SearchLink';

const centuries = [16, 17, 18, 19, 20];
const sex = {
  All: null,
  Male: 'm',
  Female: 'f',
};

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentCenturies = useCallback((century: string) => {
    const centeriesFromSearch = searchParams.getAll('centuries');

    if (centeriesFromSearch.includes(century)) {
      return centeriesFromSearch.filter(param => param !== century);
    }

    return [...centeriesFromSearch, century];
  }, [searchParams]);

  const handleQueryChange = useCallback((text: string) => {
    if (!text.length) {
      searchParams.delete('input');
      setSearchParams(searchParams);

      return;
    }

    searchParams.set('input', text);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(sex).map(([key, value]) => (
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
            onChange={(e) => handleQueryChange(e.target.value)}
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
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams
                  .getAll('centuries')
                  .length !== 0,
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
