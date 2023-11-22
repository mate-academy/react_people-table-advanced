import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuriesUrl = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(
      searchParams, { query: event.target.value || null },
    );

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !searchParams.get('sex') })}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === 'f' })}
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
            onChange={handleChangeQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(item => (
              <SearchLink
                key={item}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuriesUrl.includes(item),
                })}
                params={{
                  centuries: centuriesUrl.includes(item)
                    ? centuriesUrl.filter(century => century !== item)
                    : [...centuriesUrl, item],
                }}
              >
                {item}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success',
                { 'is-outlined': searchParams.get('centuries') })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className={cn('button is-link is-outlined is-fullwidth')}
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
