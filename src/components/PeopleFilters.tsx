import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

const CENTRURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function clearCenturies() {
    setSearchWith({ centuries: null });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">

        <Link
          type="button"
          className={classNames({
            'is-active': !sex,
          })}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>

        <Link
          type="button"
          className={classNames({
            'is-active': sex === 'm',
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>

        <Link
          type="button"
          className={classNames({
            'is-active': sex === 'f',
          })}
          to={{
            search: getSearchWith(searchParams, { sex: 'f' }),
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
            {CENTRURIES.map(century => (
              <Link
                type="button"
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={{
                  search: getSearchWith(
                    searchParams,
                    {
                      centuries: centuries.includes(century)
                        ? centuries.filter(c => century !== c)
                        : [...centuries, century],
                    },
                  ),
                }}
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
              onClick={() => clearCenturies()}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          type="button"
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
