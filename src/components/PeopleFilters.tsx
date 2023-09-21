import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';
import { Filters, availableCenturies } from '../utils/vars';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || 'all';

  const setSearchWith = (params: any) => {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWith({ query: event.target.value });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.values(Filters).map(value => {
          if (value === 'all') {
            return (
              <Link
                className={classNames('is-capitalized', {
                  'is-active': sex === value,
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    sex: null,
                  }),
                }}
                key={value}
              >
                {value}
              </Link>
            );
          }

          return (
            <Link
              className={classNames('is-capitalized', {
                'is-active': sex === value,
              })}
              to={{
                search: getSearchWith(searchParams, {
                  sex: value[0],
                }),
              }}
              key={value}
            >
              {value}
            </Link>
          );
        })}
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
            {availableCenturies.map((century) => (
              <Link
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: centuries.includes(century.toString())
                      ? centuries.filter(ch => century.toString() !== ch)
                      : [...centuries, century.toString()],
                  }),
                }}
                key={century}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={classNames('button is-success',
                { 'is-outlined': centuries.length })}
              to={{
                search: getSearchWith(searchParams, {
                  centuries: [],
                }),
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
