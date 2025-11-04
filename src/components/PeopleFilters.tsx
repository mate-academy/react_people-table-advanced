import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = [16, 17, 18, 19, 20] as const;

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');

  const selectedCenturies = new Set(
    searchParams.getAll('centuries').map(Number),
  );

  const toggleCentury = (c: number): string[] => {
    const list = searchParams.getAll('centuries').map(Number);
    const has = selectedCenturies.has(c);
    const next = has ? list.filter(v => v !== c) : [...list, c];

    return next.map(String);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': sex === 'f' })}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left is-flex-grow-1">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => {
              const raw = e.currentTarget.value;
              const search = getSearchWith(searchParams, {
                query: raw.trim() ? raw : null,
              });

              setSearchParams(search);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(c => (
              <SearchLink
                key={c}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': selectedCenturies.has(c),
                })}
                params={{ centuries: toggleCentury(c) }}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
            query: null,
            sex: null,
            centuries: null,
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
