import { useSearchParams, Link } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex') || '';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (name: string) => {
    const params = new URLSearchParams(searchParams);

    if (name) {
      params.set('query', name);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const createLinkParams = (
    newParams: Record<string, string | string[] | null>,
  ) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key);
        value.forEach(v => params.append(key, v));
      } else {
        params.set(key, value);
      }
    });

    return `?${params.toString()}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={sex === '' ? 'is-active' : ''}
          to={createLinkParams({ sex: null })}
        >
          All
        </Link>
        <Link
          className={sex === 'm' ? 'is-active' : ''}
          to={createLinkParams({ sex: 'm' })}
        >
          Male
        </Link>
        <Link
          className={sex === 'f' ? 'is-active' : ''}
          to={createLinkParams({ sex: 'f' })}
        >
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            onChange={e => handleQueryChange(e.target.value)}
            className="input"
            placeholder="Search"
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
                className={`button mr-1 ${
                  centuries.includes(century) ? 'is-info' : ''
                }`}
                to={createLinkParams({
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                })}
              >
                {century}
              </Link>
            ))}
          </div>
          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to={createLinkParams({ centuries: null })}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to={createLinkParams({
            sex: null,
            query: null,
            centuries: null,
          })}
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
