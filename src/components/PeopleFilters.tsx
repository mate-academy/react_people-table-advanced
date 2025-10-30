import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const setSex = (value: 'm' | 'f' | null) => {
    const next = new URLSearchParams(searchParams);

    if (value) {
      next.set('sex', value);
    } else {
      next.delete('sex');
    }

    setSearchParams(next);
  };

  const setQuery = (val: string) => {
    const next = new URLSearchParams(searchParams);
    const v = val.trim();

    if (v) {
      next.set('query', v);
    } else {
      next.delete('query');
    }

    setSearchParams(next);
  };

  const toggleCentury = (c: string) => {
    const next = new URLSearchParams(searchParams);
    const current = next.getAll('centuries');

    if (current.includes(c)) {
      const left = current.filter(x => x !== c);

      next.delete('centuries');
      left.forEach(x => next.append('centuries', x));
    } else {
      next.append('centuries', c);
    }

    setSearchParams(next);
  };

  const clearCenturies = () => {
    const next = new URLSearchParams(searchParams);

    next.delete('centuries');
    setSearchParams(next);
  };

  const resetAll = () => {
    const next = new URLSearchParams(searchParams);

    next.delete('sex');
    next.delete('query');
    next.delete('centuries');

    setSearchParams(next);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex ? '' : 'is-active'}
          onClick={e => {
            e.preventDefault();
            setSex(null);
          }}
          href="#/people"
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            setSex('m');
          }}
          href="#/people?sex=m"
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={e => {
            e.preventDefault();
            setSex('f');
          }}
          href="#/people?sex=f"
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
            onChange={e => setQuery(e.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(c => (
              <button
                type="button"
                key={c}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(c) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={clearCenturies}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAll}
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
