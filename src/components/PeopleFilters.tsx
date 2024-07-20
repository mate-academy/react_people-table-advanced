import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterSex = searchParams.get('sex') || '';
  const filterQuery = searchParams.get('query') || '';
  const filterCentury = searchParams.getAll('centuries') || [];

  function handleCenturiesChange(century: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = filterCentury.includes(century)
      ? filterCentury.filter(c => c !== century)
      : [...filterCentury, century];

    params.delete('centuries');
    newCenturies.forEach(newCentury => params.append('centuries', newCentury));
    setSearchParams(params);
  }

  function clearCentury() {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  }

  function handleGenderChange(gender: string) {
    const params = new URLSearchParams(searchParams);

    if (gender) {
      params.set('sex', gender);
    } else {
      params.delete('sex');
    }

    setSearchParams(params);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function handleResetFilters() {
    setSearchParams({});
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!filterSex ? 'is-active' : ''}
          onClick={() => handleGenderChange('')}
        >
          All
        </a>
        <a
          className={filterSex === 'm' ? 'is-active' : ''}
          onClick={() => handleGenderChange('m')}
        >
          Male
        </a>
        <a
          className={filterSex === 'f' ? 'is-active' : ''}
          onClick={() => handleGenderChange('f')}
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
            value={filterQuery}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${
                  filterCentury.includes(century) ? 'is-info' : ''
                }`}
                onClick={() => handleCenturiesChange(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button ${filterCentury.length === 0 ? 'is-success' : 'is-outlined'}`}
              onClick={clearCentury}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleResetFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
