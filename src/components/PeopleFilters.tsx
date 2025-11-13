import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const CENTURIES = ['16', '17', '18', '19', '20'];

  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = getSearchWith(searchParams, {
      query: event.target.value.trimStart() || null,
    });

    setSearchParams(new URLSearchParams(newSearch));
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
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
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
            {CENTURIES.map(century => {
              const isActive = centuries.includes(century);

              const newCenturies = isActive
                ? centuries.filter(c => c !== century)
                : [...centuries, century];

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', { 'is-info': isActive })}
                  params={{ centuries: newCenturies }}
                >
                  {century}
                </SearchLink>
              );
            })}
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
