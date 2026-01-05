import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value || null;

    setSearchParams(getSearchWith(searchParams, { query: value }));
  };

  const getNextCenturies = (clicked: string) => {
    if (centuries.includes(clicked)) {
      return centuries.filter(c => c !== clicked);
    }

    return [...centuries, clicked];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!sex ? 'is-active' : ''}
          to={{
            search: getSearchWith(searchParams, { sex: null }),
          }}
        >
          All
        </Link>

        <Link
          className={sex === 'm' ? 'is-active' : ''}
          to={{
            search: getSearchWith(searchParams, { sex: 'm' }),
          }}
        >
          Male
        </Link>

        <Link
          className={sex === 'f' ? 'is-active' : ''}
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
            {CENTURIES.map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: getSearchWith(searchParams, {
                    centuries: getNextCenturies(century),
                  }),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={{
                search: getSearchWith(searchParams, {
                  centuries: null,
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
          to={{ search: '' }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
