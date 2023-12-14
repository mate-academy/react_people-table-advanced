import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import { TypeSex } from '../types/TypeSex';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || null;
  const centuriesArray = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: event.target.value || null,
      }),
    );
  };

  const handleCenturyToggle = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(ch => century !== ch)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: TypeSex.Male }) }}
          className={cn({ 'is-active': sex === TypeSex.Male })}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith(searchParams, { sex: TypeSex.Female }) }}
          className={cn({ 'is-active': sex === TypeSex.Female })}
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
                to={{
                  search: getSearchWith(
                    searchParams,
                    { centuries: handleCenturyToggle(century) },
                  ),
                }}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': centuries.length > 0,
              })}
              to={{
                search: getSearchWith(
                  searchParams, {
                    centuries: null,
                  },
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
                sex: null, query: null, centuries: null,
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
