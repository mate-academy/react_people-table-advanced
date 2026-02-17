import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { useState, useEffect } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const name = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const [query, setQuery] = useState(name);
  const toggleCentury = (century: string) => {
    const next = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    return next.length ? next : null;
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev);

        if (query) {
          next.set('query', query);
        } else {
          next.delete('query');
        }

        return next;
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, setSearchParams]);

  useEffect(() => {
    setQuery(name);
  }, [name]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={sex === '' ? 'is-active' : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <input
          data-cy="NameFilter"
          type="search"
          className="input"
          placeholder="Search"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <SearchLink
                key={c}
                data-cy="century"
                params={{ centuries: toggleCentury(c) }}
                className={`button mr-1 ${
                  centuries.includes(c) ? 'is-info' : ''
                }`}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: null }}
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <SearchLink
        className="button is-link is-outlined is-fullwidth"
        params={{
          sex: null,
          query: null,
          centuries: null,
          sort: null,
          order: null,
        }}
      >
        Reset all filters
      </SearchLink>
    </nav>
  );
};
