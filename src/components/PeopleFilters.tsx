import classnames from 'classnames';
import {
  Link, useSearchParams,
} from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const parentPath = useResolvedPath('../').pathname;
  // const location = useLocation();

  const sex = searchParams.get('sex') || null;
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function getSearchWith(params: { [key: string]: string[] | string | null }) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        searchParams.delete(key);
      } else if (Array.isArray(value)) {
        searchParams.delete(key);

        value.forEach(part => {
          searchParams.append(key, part);
        });
      } else {
        searchParams.set(key, value);
      }
    });

    // setSearchParams(searchParams);

    return searchParams.toString();
  }

  // const onSexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   updateSearch({ sex: event.target.value || null });
  // };

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(getSearchWith({ query: event.target.value || null }));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classnames(
            { 'is-active': sex === null },
          )}
          to={{
            search: getSearchWith({ sex: null }),
          }}
        >
          All
        </Link>
        <Link
          className={classnames(
            { 'is-active': sex === 'm' },
          )}
          to={{
            search: getSearchWith({ sex: 'm' }),
          }}
        >
          Male
        </Link>
        <Link
          className={classnames(
            { 'is-active': sex === 'f' },
          )}
          to={{
            search: getSearchWith({ sex: 'f' }),
          }}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            defaultValue={query}
            onChange={onQueryChange}
            className="input"
            placeholder="Search"
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
              <Link
                to={{
                  search: getSearchWith({
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
                data-cy="century"
                key={century}
                className={
                  classnames(
                    'button',
                    'mr-1',
                    { 'is-info': centuries.includes(century) },
                  )
                }
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                getSearchWith({ centuries: null });
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
