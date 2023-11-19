import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { getSearchWith } from '../utils/searchHelper';

const centuriesArray = [
  '16', '17', '18', '19', '20',
];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || 'All';
  const query = searchParams.get('query') || '';

  const toggleCenturies = (century: string) => {
    if (!century) {
      return getSearchWith(searchParams, {
        centuries: [],
      });
    }

    return getSearchWith(searchParams, {
      centuries: centuries.includes(century)
        ? centuries.filter(ch => ch !== century)
        : [...centuries, century],
    });
  };

  const toggleSex = (newSex: string | null) => {
    if (newSex === 'All') {
      return getSearchWith(searchParams, { sex: null });
    }

    return getSearchWith(searchParams, { sex: newSex });
  };

  const toggleQuery = (newQuery: string) => {
    const search = getSearchWith(searchParams, { query: newQuery });

    setSearchParams(search);
  };

  const toggleAllReset = () => {
    return getSearchWith(
      searchParams, { query: null, centuries: [], sex: null },
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={cn({ 'is-active': sex === 'All' })}
          to={{ search: toggleSex('All') }}
        >
          All
        </Link>
        <Link
          className={cn({ 'is-active': sex === 'm' })}
          to={{ search: toggleSex('m') }}
        >
          Male
        </Link>
        <Link
          className={cn({ 'is-active': sex === 'f' })}
          to={{ search: toggleSex('f') }}
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
            onChange={(event) => toggleQuery(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArray.map((century) => (
              <Link
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                to={{
                  search: toggleCenturies(century),
                }}
              >
                {century}
              </Link>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length,
              })}
              to={{ search: toggleCenturies('') }}

            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={{ search: toggleAllReset() }}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
