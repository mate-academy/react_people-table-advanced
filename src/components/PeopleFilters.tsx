/* eslint no-console: ["error", { allow: ["warn", "log"] }] */
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value) {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const currentCenturiesParams = searchParams.getAll('centuries');
  const isAllFilterCleared =
    !searchParams.has('query') &&
    !searchParams.has('centuries') &&
    !searchParams.has('sex');

  const isCenturyIncluded = (century: string) =>
    currentCenturiesParams?.includes(century);

  const getNewCenturiesParams = (century: string) =>
    isCenturyIncluded(century)
      ? currentCenturiesParams.filter(curr => curr !== century)
      : [...currentCenturiesParams, century];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !searchParams.has('sex') })}
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
            <SearchLink
              className={cn('button', 'mr-1', {
                'is-info': isCenturyIncluded('16'),
              })}
              params={{
                centuries: getNewCenturiesParams('16'),
              }}
            >
              16
            </SearchLink>
            <SearchLink
              className={cn('button', 'mr-1', {
                'is-info': isCenturyIncluded('17'),
              })}
              params={{
                centuries: getNewCenturiesParams('17'),
              }}
            >
              17
            </SearchLink>
            <SearchLink
              className={cn('button', 'mr-1', {
                'is-info': isCenturyIncluded('18'),
              })}
              params={{
                centuries: getNewCenturiesParams('18'),
              }}
            >
              18
            </SearchLink>
            <SearchLink
              className={cn('button', 'mr-1', {
                'is-info': isCenturyIncluded('19'),
              })}
              params={{
                centuries: getNewCenturiesParams('19'),
              }}
            >
              19
            </SearchLink>
            <SearchLink
              className={cn('button', 'mr-1', {
                'is-info': isCenturyIncluded('20'),
              })}
              params={{
                centuries: getNewCenturiesParams('20'),
              }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': searchParams.has('centuries'),
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
          data-cy="resetFilters"
          className={cn('button', 'is-link', 'is-fullwidth', {
            'is-outlined': !isAllFilterCleared,
          })}
          params={{ centuries: null, query: null, sex: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
