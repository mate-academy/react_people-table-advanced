import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import SexFilter from '../types/SexFilter';

const CENTURY_LIST = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexFilter = (searchParams.get('sex') as SexFilter) || null;
  const query = searchParams.get('query') || '';
  const centuriesFilter = searchParams.getAll('centuries');

  const handleInputChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const getCenturiesParams = (century: string) => {
    if (centuriesFilter.includes(century)) {
      return {
        centuries: centuriesFilter.filter(c => c !== century),
      };
    } else {
      return {
        centuries: [...centuriesFilter, century],
      };
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: 'null' }}
          className={cn({ 'is-active': sexFilter === null })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sexFilter === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sexFilter === 'f' })}
        >
          Female
        </SearchLink>
        <a className="is-active" href="#/people"></a>
        <a className="" href="#/people?sex=m"></a>
        <a className="" href="#/people?sex=f"></a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => handleInputChange(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURY_LIST.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuriesFilter.includes(century),
                })}
                params={getCenturiesParams(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
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
          params={{
            sex: null,
            query: null,
            centuries: [],
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
