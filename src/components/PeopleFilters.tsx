import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || null;
  const currentCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';
  const hasCenturies = searchParams.has('centuries');

  const toggleCentury = (century: number) => {
    const newParams = new URLSearchParams(searchParams);
    const value = century.toString();

    if (currentCenturies.includes(value)) {
      const updatedCenturies = currentCenturies.filter(c => c !== value);

      newParams.delete('centuries');
      updatedCenturies.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', value);
    }

    setSearchParams(newParams);
  };

  const handleFilterChange = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === null ? 'is-active' : ''}
          onClick={() => handleFilterChange('sex', null)}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleFilterChange('sex', 'm')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => handleFilterChange('sex', 'f')}
        >
          Female
        </a>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            value={query}
            className="input"
            placeholder="Search"
            onChange={event => {
              const value = event.target.value;

              if (value.length === 0) {
                handleFilterChange('query', null);
              } else {
                handleFilterChange('query', value);
              }
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(c => (
              <button
                key={c}
                data-cy="century"
                className={`button mr-1 ${currentCenturies.includes(c.toString()) ? 'is-info' : ''}`}
                onClick={() => {
                  toggleCentury(c);
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={
                !hasCenturies
                  ? 'button is-success'
                  : 'button is-success is-outlined'
              }
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);

                newParams.delete('centuries');
                setSearchParams(newParams);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            const newParams = new URLSearchParams(searchParams);

            newParams.delete('sex');
            newParams.delete('centuries');
            newParams.delete('query');

            setSearchParams(newParams);
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
