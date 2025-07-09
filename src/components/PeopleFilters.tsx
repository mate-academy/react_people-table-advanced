import { Link, useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value.trim() === '') {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }

    setSearchParams(searchParams);
  };

  const toggleCentury = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');
    const updated = new Set(current);

    if (updated.has(century)) {
      updated.delete(century);
    } else {
      updated.add(century);
    }

    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    updated.forEach(c => newParams.append('centuries', c));

    return `/people?${newParams.toString()}`;
  };

  const buildUrl = (newParams: Record<string, string | null | undefined>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value ?? '');
      }
    });

    return `/people?${params.toString()}`;
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          to={buildUrl({ sex: null })}
          className={!searchParams.get('sex') ? 'is-active' : ''}
        >
          All
        </Link>
        <Link
          to={buildUrl({ sex: 'm' })}
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
        >
          Male
        </Link>
        <Link
          to={buildUrl({ sex: 'f' })}
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
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
            value={searchParams.get('query') || ''}
            onChange={handleNameChange}
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
              const selected = searchParams
                .getAll('centuries')
                .includes(century);

              return (
                <Link
                  key={century}
                  to={toggleCentury(century)}
                  className={`button mr-1 ${selected ? 'is-info' : ''}`}
                >
                  {century}
                </Link>
              );
            })}

            <div className="level-right ml-4">
              <Link
                className="button is-success is-outlined"
                data-cy="centuryALL"
                to={'/people'}
              >
                All
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link to="/people" className="button is-link is-outlined is-fullwidth">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
