import { Link, useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';
import cn from 'classnames';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newSearch = getSearchWith(searchParams, {
      query: event.target.value || null,
    });

    setSearchParams(newSearch);
  }

  const getCenturyLink = (century: string) => {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    const centuriesParam = newCenturies.length > 0 ? newCenturies : null;

    return getSearchWith(searchParams, { centuries: centuriesParam });
  };

  const isCenturyActive = (century: string) =>
    searchParams.getAll('centuries').includes(century);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['', 'm', 'f'].map(sex => (
          <Link
            key={sex}
            className={searchParams.get('sex') === sex ? 'is-active' : ''}
            to={{
              pathname: '/people',
              search: getSearchWith(searchParams, { sex: sex || null }),
            }}
          >
            {sex === '' ? 'All' : sex === 'm' ? 'Male' : 'Female'}
          </Link>
        ))}
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
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': isCenturyActive(century),
                })}
                to={{
                  pathname: '/people',
                  search: getCenturyLink(century),
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
                pathname: '/people',
                search: getSearchWith(searchParams, { centuries: null }),
              }}
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
