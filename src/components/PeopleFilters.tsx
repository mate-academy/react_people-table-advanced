import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from '../utils/useSearchParams';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const {
    sex,
    query,
    searchParams,
    setSearchParams,
    centuriesUrl,
  } = useSearchParams();

  const centuries = Array.from(
    { length: 5 },
    (_, index) => String(16 + index),
  );

  const handleQueryChane = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
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
            onChange={handleQueryChane}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(num => (
              <SearchLink
                data-cy="century"
                className={cn('button mr-1',
                  { 'is-info': centuriesUrl.includes(num) })}
                params={{
                  centuries: centuriesUrl.includes(num)
                    ? centuriesUrl.filter(century => century !== num)
                    : [...centuriesUrl, num],
                }}
              >
                {num}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuriesUrl.length,
              })}
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
            query: null,
            centuries: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
