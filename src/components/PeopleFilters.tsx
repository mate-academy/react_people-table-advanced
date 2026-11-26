import { Link, useSearchParams } from 'react-router-dom';

import { getSearchWith } from '../utils/searchHelper';

import { Params } from '../types/SearchParams';
import classNames from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const handleSearchWith = (params: Params) => {
    const search = getSearchWith(params, searchParams);

    setSearchParams(search, { replace: true });
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchWith({ query: event.target.value || null });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={{ search: getSearchWith({ sex: null }, searchParams) }}
          className={sex === '' ? 'is-active' : ''}
        >
          All
        </Link>
        <Link
          to={{ search: getSearchWith({ sex: 'm' }, searchParams) }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </Link>
        <Link
          to={{ search: getSearchWith({ sex: 'f' }, searchParams) }}
          className={sex === 'f' ? 'is-active' : ''}
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
            onChange={handleQueryChange}
            value={query}
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
                to={{
                  search: getSearchWith(
                    {
                      centuries: centuries.includes(century.toString())
                        ? centuries.filter(c => c !== century.toString())
                        : [...centuries, century.toString()],
                    },
                    searchParams,
                  ),
                }}
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century.toString()),
                })}
                data-cy="century"
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{
                search: getSearchWith({ centuries: null }, searchParams),
              }}
              data-cy="centuryALL"
              className="button is-success is-outlined"
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          to={{
            search: getSearchWith(
              {
                query: null,
                sex: null,
                centuries: null,
                sort: null,
                order: null,
              },
              searchParams,
            ),
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
