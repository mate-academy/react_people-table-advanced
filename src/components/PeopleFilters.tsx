import { useSearchParams } from 'react-router-dom';
const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const updateQuery = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');

    params.delete('centuries');

    if (!current.includes(century)) {
      current.forEach(c => params.append('centuries', c));
      params.append('centuries', century);
    } else {
      current
        .filter(c => c !== century)
        .forEach(c => params.append('centuries', c));
    }

    setSearchParams(params);
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const sex = searchParams.get('sex');

  const setSex = (value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === null ? 'is-active' : ''}
          onClick={() => setSex(null)}
        >
          All
        </a>

        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => setSex('m')}
        >
          Male
        </a>

        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => setSex('f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={e => updateQuery(e.target.value)}
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
              <button
                key={century}
                data-cy="century"
                type="button"
                className={`button mr-1 ${
                  selectedCenturies.includes(century) ? 'is-info' : ''
                }`}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              type="button"
              className="button is-success is-outlined"
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
