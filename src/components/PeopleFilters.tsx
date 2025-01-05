import { Link, useSearchParams } from "react-router-dom";
import classNames from "classnames";
import { getSearchWith } from "../utils/searchHelper";
import { useSetSearchWith } from "./hooks/useSetSearchWith";

export const PeopleFilters = () => {
  const [searchParams] = useSearchParams();
  const setSearchWith = useSetSearchWith();
  const centuriesNum = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: e.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames('', {
            'is-active': !searchParams.has('sex'),
          })}
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
        >
          All
        </Link>
        <Link
          className={classNames('', {
            'is-active': searchParams.get('sex') === 'm',
          })}
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
        >
          Male
        </Link>
        <Link
          className={classNames('', {
            'is-active': searchParams.get('sex') === 'f',
          })}
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
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
            onChange={(e) => handleQueryChange(e)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', { 'is-info': centuriesNum.includes(`${century}`) })}
                to={{
                  search: getSearchWith({
                    centuries: centuriesNum.includes(`${century}`)
                      ? centuriesNum.filter(cen => +cen !== century)
                      : [...centuriesNum, `${century}`]
                  }, searchParams),
                }}
              >
                {century}
              </Link>

            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button', {
                'is-success': centuriesNum.length === 0,
                'is-success is-outlined': centuriesNum.length > 0,
              })}
              to={{
                search: getSearchWith({ centuries: null }, searchParams),
              }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link className="button is-link is-outlined is-fullwidth" to={{
          search: getSearchWith({}),
        }}>
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
