import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centurieValues = ['16', '17', '18', '19', '20'];
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, { query: event.target.value || null }),
    );
  }

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
        <p className="control has-icons-left">
          <input
            type="search"
            data-cy="NameFilter"
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
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centurieValues.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(cen => cen !== century)
                    : [...centuries, century],
                }}
              >
                {century}
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
        {' '}
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
