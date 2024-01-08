import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../types/PersonSex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sexFilter = searchParams.get('sex') || null;
  const centuriesFilter = searchParams.getAll('century') || [];

  const centuriesArray = ['16', '17', '18', '19', '20'];

  function handleQueryChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  }

  function toggleCenturyFilter(century: string) {
    return centuriesFilter.includes(century)
      ? centuriesFilter.filter(ch => century !== ch)
      : [...centuriesFilter, century];
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': !sexFilter })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>

        <Link
          className={cn({ 'is-active': sexFilter === Sex.Male })}
          to={{ search: getSearchWith(searchParams, { sex: Sex.Male }) }}
        >
          Male
        </Link>

        <Link
          className={cn({ 'is-active': sexFilter === Sex.Female })}
          to={{ search: getSearchWith(searchParams, { sex: Sex.Female }) }}
        >
          Female
        </Link>
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
            {centuriesArray.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuriesFilter.includes(century),
                })}
                to={{
                  search: getSearchWith(
                    searchParams,
                    { century: toggleCenturyFilter(century) },
                  ),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuriesFilter.length,
              })}
              to={{
                search: getSearchWith(
                  searchParams,
                  { century: null },
                ),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{
            search: getSearchWith(
              searchParams, {
                sex: null, query: null, century: null,
              },
            ),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
