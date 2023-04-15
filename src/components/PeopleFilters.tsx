import { Link, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchPearms] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');
  const query = searchParams.get('query');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPearms(getSearchWith(
      { query: event.target.value || null },
      searchParams,
    ));
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={classNames({
            'is-active': !sex,
          })}
          to={{
            search: getSearchWith({ sex: null }, searchParams),
          }}
        >
          All
        </Link>

        <Link
          className={classNames({
            'is-active': sex === 'm',
          })}
          to={{
            search: getSearchWith({ sex: 'm' }, searchParams),
          }}
        >
          Male
        </Link>

        <Link
          className={classNames({
            'is-active': sex === 'f',
          })}
          to={{
            search: getSearchWith({ sex: 'f' }, searchParams),
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
            value={query || ''}
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
            { ['16', '17', '18', '19', '20'].map(century => (
              <Link
                key={century}
                data-cy="century"
                className={classNames(
                  'button mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                to={{
                  search: getSearchWith({
                    centuries: centuries.includes(century)
                      ? centuries.filter(cen => cen !== century)
                      : [...centuries, century],
                  }, searchParams),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              to={{
                search: getSearchWith({
                  centuries: null,
                }, searchParams),
              }}
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': centuries.length },
              )}
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
            search: '',
          }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
