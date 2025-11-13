import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  // const sex = searchParams.get('sex') || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleSexFilter(value: string | null) {
    setSearchWith({ sex: value || null });
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  // function toggleCenturies(num: string) {
  //   const newCenturies = centuries.includes(num)
  //     ? centuries.filter(cent => cent !== num)
  //     : [...centuries, num];

  //   setSearchWith({ centuries: newCenturies });
  // }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === null,
          })}
          to={{ search: getSearchWith(searchParams, { sex: null }) }}
          onClick={() => {
            handleSexFilter(null);
          }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={{ search: getSearchWith(searchParams, { sex: 'm' }) }}
          onClick={() => {
            handleSexFilter('m');
          }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={{ search: getSearchWith(searchParams, { sex: 'f' }) }}
          onClick={() => {
            handleSexFilter('f');
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
            {['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century)
                      ? centuries.filter(c => c !== century)
                      : [...centuries, century],
                  }),
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{
                search: getSearchWith(searchParams, { centuries: null }),
              }}
              className="button is-success is-outlined"
              data-cy="centuryALL"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to="/people">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
