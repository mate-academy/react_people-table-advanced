import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  function handlePageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value.trim();

    if (value) {
      searchParams.set('query', value);
    } else {
      searchParams.delete('query');
    }

    setSearchParams(searchParams);
  }

  function handleSexChange(sex: string | null) {
    if (sex) {
      searchParams.set('sex', sex);
    } else {
      searchParams.delete('sex');
    }

    setSearchParams(searchParams);
  }

  function toggleCentury(century: string) {
    const params = new URLSearchParams(searchParams);
    const newCertury = centuries.includes(century)
      ? centuries.filter(cen => cen !== century)
      : [...centuries, century];

    params.delete('centuries');

    newCertury.forEach(cen => params.append('centuries', cen));
    setSearchParams(params);
  }

  const reset = () => {
    searchParams.delete('query');
    searchParams.delete('sex');
    searchParams.delete('centuries');
    setSearchParams(searchParams);
  };

  const centries = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={`${!selectedSex ? 'is-active' : ''}`}
          onClick={() => handleSexChange(null)}
        >
          All
        </a>
        <a
          className={`${selectedSex === 'm' ? 'is-active' : ''}`}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={`${selectedSex === 'f' ? 'is-active' : ''}`}
          onClick={() => handleSexChange('f')}
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
            onChange={handlePageChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centries.map(cen => (
              <button
                key={cen}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(cen) && 'is-info'}`}
                onClick={() => toggleCentury(cen)}
              >
                {cen}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                searchParams.delete('centuries');
                setSearchParams(searchParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" onClick={reset}>
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
