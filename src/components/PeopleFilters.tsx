import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // === NameFilter ===
  const query = searchParams.get('query') || '';
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  // === SexFilter ===
  const sex = searchParams.get('sex');
  const setSex = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('sex', value);
    } else {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  };

  // === CenturyFilter ===
  const centuries = searchParams.getAll('centuries');
  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams);

    const current = newParams.getAll('centuries');

    if (current.includes(century)) {
      const filtered = current.filter(c => c !== century);

      newParams.delete('centuries');
      filtered.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const resetCenturies = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  const resetAll = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className={!sex ? 'is-active' : ''} onClick={() => setSex(null)}>
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
            onChange={handleQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      {/* CenturyFilter */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${
                  centuries.includes(c) ? 'is-info' : ''
                }`}
                onClick={() => toggleCentury(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={resetCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {/* Reset All */}
      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
