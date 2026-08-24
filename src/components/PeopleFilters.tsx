import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');

  const selectedCenturies = searchParams.getAll('centuries').map(Number);
  const centuries = [16, 17, 18, 19, 20];

  const updateParam = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    setSearchParams(params);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    updateParam('query', value || null);
  };

  const handleCenturyClick = (century: number) => {
    const params = new URLSearchParams(searchParams);

    const currentCenturies = params.getAll('centuries').map(Number);

    params.delete('centuries');

    const newCenturies = currentCenturies.includes(century)
      ? currentCenturies.filter(item => item !== century)
      : [...currentCenturies, century];

    newCenturies.forEach(item => {
      params.append('centuries', String(item));
    });

    setSearchParams(params);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('sex');
    params.delete('centuries');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            updateParam('sex', null);
          }}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            updateParam('sex', 'm');
          }}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            updateParam('sex', 'f');
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
            onChange={handleQueryChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div
          className="is-flex is-flex-wrap-wrap is-align-items-center"
          data-cy="CenturyFilter"
        >
          <div className="is-flex is-flex-wrap-wrap">
            {centuries.map(century => {
              const isSelected = selectedCenturies.includes(century);

              return (
                <button
                  key={century}
                  type="button"
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  onClick={() => handleCenturyClick(century)}
                >
                  {century}
                </button>
              );
            })}
          </div>

          <div className="ml-2">
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
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
