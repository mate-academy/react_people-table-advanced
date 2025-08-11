import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearcWith(params) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearcWith({ query: event.target.value || null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames(!sex ? 'is-active' : '')}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames(sex === 'm' ? 'is-active' : '')}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames(sex === 'f' ? 'is-active' : '')}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
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
            {['16', '17', '18', '19', '20'].map(year => (
              <Link
                key={year}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(year)
                      ? centuries.filter(y => year !== y)
                      : [...centuries, year],
                  }),
                }}
                className={classNames('button', {
                  'is-info': centuries.includes(year),
                })}
              >
                {year}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuries.length !== 0,
              })}
              to={{ search: getSearchWith(searchParams, { centuries: null }) }}
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
              sex: null,
              centuries: null,
              query: null,
            }),
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
