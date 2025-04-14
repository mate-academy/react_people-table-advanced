import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex') || '';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const current = newParams.getAll('centuries');

    if (current.includes(century)) {
      const updated = current.filter(c => c !== century);

      newParams.delete('centuries');
      updated.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const handleReset = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('query');
    newParams.delete('sex');
    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  const isFiltersReset =
    !searchParams.get('query') &&
    !searchParams.getAll('centuries').length &&
    !searchParams.get('sex');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['', 'm', 'f'].map(value => {
          const isActive = sex === value || (value === '' && !sex);

          return (
            <button
              key={value}
              className={`button ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);

                if (value === '') {
                  newParams.delete('sex');
                } else {
                  newParams.set('sex', value);
                }

                setSearchParams(newParams);
              }}
            >
              {value === '' ? 'All' : value === 'm' ? 'Male' : 'Female'}
            </button>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <button
                key={century}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(String(century)) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(String(century))}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className={`button is-success ${centuries.length > 0 ? 'is-outlined' : ''}`}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);

                newParams.delete('centuries');
                setSearchParams(newParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className={`button is-link is-outlined is-fullwidth ${isFiltersReset ? 'is-outlined' : ''}`}
          onClick={handleReset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
