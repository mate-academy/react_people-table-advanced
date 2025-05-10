import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { Sex } from '../types';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export default function PeopleFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sexParams = searchParams.get('sex') as Sex | null;
  const queryParams = searchParams.get('query') ?? '';
  const centuriesParams = searchParams.getAll('centuries');

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams(
      getSearchWith(searchParams, { query: e.target.value || null }),
    );
  }

  function getActiveCenturies(century: string) {
    return centuriesParams.includes(century)
      ? centuriesParams.filter(currentCenture => currentCenture !== century)
      : [...centuriesParams, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sexParams })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.Male }}
          className={cn({ 'is-active': sexParams === Sex.Male })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.Female }}
          className={cn({ 'is-active': sexParams === Sex.Female })}
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
            value={queryParams}
            onChange={handleChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuriesParams.includes(century),
                })}
                params={{ centuries: getActiveCenturies(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuriesParams.length,
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
          params={{ query: null, sex: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
}
