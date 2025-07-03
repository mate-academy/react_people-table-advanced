import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SearchLink } from '../SearchLink/SearchLink';

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);

  const sortParams = {
    ...(sort ? { sort } : {}),
    ...(order ? { order } : {}),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams.toString());

      if (query) {
        newParams.set('query', query);
      } else {
        newParams.delete('query');
      }

      navigate({ search: newParams.toString() }, { replace: true });
    }, 400);

    return () => clearTimeout(timer);
  }, [query, navigate, searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ ...sortParams, sex: null }} className="panel-tab">
          All
        </SearchLink>
        <SearchLink params={{ ...sortParams, sex: 'm' }} className="panel-tab">
          Male
        </SearchLink>
        <SearchLink params={{ ...sortParams, sex: 'f' }} className="panel-tab">
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
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                className="button mr-1"
                activeClassName="is-info"
                params={{
                  ...sortParams,
                  query,
                  centuries: [century],
                }}
                toggleArrayParam
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              className="button is-success is-outlined"
              params={{ ...sortParams, query, centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{ sex: null, centuries: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
