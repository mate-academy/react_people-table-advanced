import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value.trim()) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const handleSexChange = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('sex', value);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  };

  const handleCenturyChange = (century: number) => {
    const params = new URLSearchParams(searchParams);
    const value = String(century);

    const selectedCenturies = params.getAll('centuries');

    params.delete('centuries');

    if (selectedCenturies.includes(value)) {
      selectedCenturies
        .filter(item => item !== value)
        .forEach(item => params.append('centuries', item));
    } else {
      [...selectedCenturies, value]
        .sort((a, b) => Number(a) - Number(b))
        .forEach(item => params.append('centuries', item));
    }

    setSearchParams(params);
  };

  const handleReset = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {[
          { value: '', label: 'All' },
          { value: 'm', label: 'Male' },
          { value: 'f', label: 'Female' },
        ].map(option => (
          <a
            key={option.label}
            href="#/people"
            className={sex === option.value ? 'is-active' : ''}
            onClick={event => {
              event.preventDefault();
              handleSexChange(option.value);
            }}
          >
            {option.label}
          </a>
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
            onChange={event => handleQueryChange(event.target.value)}
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
                type="button"
                data-cy="century"
                className={`button mr-1 ${
                  centuries.includes(String(century)) ? 'is-info' : ''
                }`}
                onClick={() => handleCenturyChange(century)}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
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
          onClick={handleReset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
