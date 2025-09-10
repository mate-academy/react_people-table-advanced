import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const activeCenturies = searchParams.getAll('centuries');
  const centuries = ['16', '17', '18', '19', '20'];

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
            value={query}
            onChange={e => {
              const value = e.target.value.trim();

              setSearchParams(
                getSearchWith(searchParams, { query: value || null }),
              );
            }}
            type="search"
            className="input"
            placeholder="Search"
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(c => {
              const isActive = activeCenturies.includes(c);

              const newCenturies = isActive
                ? activeCenturies.filter(v => v !== c)
                : [...activeCenturies, c];

              return (
                <SearchLink
                  key={c}
                  params={{
                    centuries: newCenturies.length ? newCenturies : null,
                  }}
                  className={classNames('button mr-1', {
                    'is-info': isActive,
                  })}
                  data-cy="century"
                >
                  {c}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              className={classNames('button is-success is-outlined', {
                'is-active': activeCenturies.length === 0,
              })}
              data-cy="centuryALL"
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
            order: null,
            sort: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
