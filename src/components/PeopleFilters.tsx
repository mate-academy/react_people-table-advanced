import { useSearchParams } from 'react-router-dom';
import { useState, ChangeEvent, useEffect } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const selectedCenturies = searchParams.getAll('centuries');
  const selectedSex = searchParams.get('sex');

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
  }, [searchParams]);

  const CENTURIES = ['16', '17', '18', '19', '20'];

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setQuery(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleCenturyFilter = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');

    if (current.includes(century)) {
      const newCenturies = current.filter(c => c !== century);

      params.delete('centuries');
      newCenturies.forEach(c => params.append('centuries', c));
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={`${!selectedSex ? 'is-active' : ''}`}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.delete('sex');
            setSearchParams(params);
          }}
        >
          All
        </a>
        <a
          className={`${selectedSex === 'm' ? 'is-active' : ''}`}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set('sex', 'm');
            setSearchParams(params);
          }}
        >
          Male
        </a>
        <a
          className={`${selectedSex === 'f' ? 'is-active' : ''}`}
          onClick={() => {
            const params = new URLSearchParams(searchParams);

            params.set('sex', 'f');
            setSearchParams(params);
          }}
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
            onChange={e => handleQueryChange(e)}
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
                type="button"
                className={`button mr-1 ${selectedCenturies.includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyFilter(century)}
                data-cy="century"
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              className={`button is-success is-outlined ${selectedCenturies.length === 0 ? 'is-active' : ''}`}
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
              }}
              data-cy="centuryALL"
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
