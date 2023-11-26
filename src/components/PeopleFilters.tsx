import cn from 'classnames';
import { useSearchParams } from '../utils/useSearchParams';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const {
    sex,
    query,
    centuriesUrl,
    searchParams,
    setSearchParams,
  } = useSearchParams();

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = getSearchWith(searchParams, (
      { query: e.target.value || null }
    ));

    setSearchParams(search);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn('',
            { 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn('',
            { 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn('',
            { 'is-active': sex === 'f' })}
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
            {centuries.map(item => {
              return (
                <SearchLink
                  data-cy="century"
                  className={cn('button mr-1',
                    { 'is-info': centuriesUrl.includes(item) })}
                  params={{
                    centuries: centuriesUrl.includes(item)
                      ? centuriesUrl.filter(century => century !== item)
                      : [...centuriesUrl, item],
                  }}
                >
                  {item}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success',
                { 'is-outlined': centuriesUrl.length > 0 })}
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
