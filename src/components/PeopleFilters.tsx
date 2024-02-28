import { useSearchParams, Link } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const centuriesButtoms = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries: string[] = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  const toggleCentury = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
          className={classNames({ 'is-active': !sex.length })}
        >
          All
        </Link>

        <Link
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </Link>

        <Link
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
          }}
          className={classNames({ 'is-active': sex === 'f' })}
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
            {centuriesButtoms.map(century => (
              <Link
                data-cy="century"
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: toggleCentury(century),
                  }),
                }}
                className={classNames(`button mr-1`, {
                  'is-info': searchParams.getAll('centuries').includes(century),
                })}
                key={century}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
              className="button is-success is-outlined"
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
            search: getSearchWith(searchParams, {
              query: null,
              sex: null,
              centuries: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
