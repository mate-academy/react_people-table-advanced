import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { useEffect, useState } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');

  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const trimmed = query.trim();

      setSearchParams(
        prev =>
          new URLSearchParams(
            (() => {
              const newParams = new URLSearchParams(prev);

              if (trimmed) {
                newParams.set('query', trimmed);
              } else {
                newParams.delete('query');
              }

              return newParams.toString();
            })(),
          ),
      );
    }, 400);

    return () => clearTimeout(timeout);
  }, [query, setSearchParams]);

  const toggleCentury = (century: string): { centuries: string[] | null } => {
    const current = searchParams.getAll('centuries');

    const next = current.includes(century)
      ? current.filter(c => c !== century)
      : [...current, century];

    return { centuries: next.length > 0 ? next : null };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!currentSex ? 'is-active' : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={currentSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={currentSex === 'f' ? 'is-active' : ''}
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
            {['16', '17', '18', '19', '20'].map(century => {
              const isActive = activeCenturies.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  params={toggleCentury(century)}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success is-outlined ${activeCenturies.length === 0 ? 'is-active' : ''}`}
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
            sex: null,
            centuries: null,
            query: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
