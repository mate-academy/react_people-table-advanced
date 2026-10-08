import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');

  const handleCenturyToggle = (century: string) => {
    if (centuries.includes(century)) {
      return centuries.filter(localCentury => localCentury !== century);
    } else {
      return [...centuries, century];
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': searchParams.get('sex') === null })}
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
            value={searchParams.get('query') || ''}
            onChange={event =>
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              )
            }
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
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('16'),
              })}
              params={{ centuries: handleCenturyToggle('16') }}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('17'),
              })}
              params={{ centuries: handleCenturyToggle('17') }}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('18'),
              })}
              params={{ centuries: handleCenturyToggle('18') }}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('19'),
              })}
              params={{ centuries: handleCenturyToggle('19') }}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={cn('button mr-1', {
                'is-info': centuries.includes('20'),
              })}
              params={{ centuries: handleCenturyToggle('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success is-outlined', {
                'is-active': centuries.length === 0,
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
