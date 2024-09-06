import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const setSearchWith = (params: SearchParams) => {
    return getSearchWith(searchParams, params);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const paramsWithQuery = setSearchWith({ query: e.target.value || null });

    setSearchParams(paramsWithQuery);
  };

  const toggleCenturies = (c: string) => {
    return centuries.includes(c)
      ? centuries.filter(item => item !== c)
      : [...centuries, c];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({ 'is-active': !searchParams.has('sex') })}
          to={{ search: setSearchWith({ sex: null }) }}
        >
          All
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={{ search: setSearchWith({ sex: 'm' }) }}
        >
          Male
        </Link>
        <Link
          className={classNames({
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={{ search: setSearchWith({ sex: 'f' }) }}
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
            {['16', '17', '18', '19', '20'].map(century => {
              return (
                <Link
                  key={century}
                  to={{
                    search: setSearchWith({
                      centuries: toggleCenturies(century),
                    }),
                  }}
                  data-cy="century"
                  className={classNames('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                >
                  {century}
                </Link>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': searchParams.has('centuries'),
              })}
              to={{ search: setSearchWith({ centuries: null }) }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to=".">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
