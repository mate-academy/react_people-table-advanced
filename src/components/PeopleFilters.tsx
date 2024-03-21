import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setsearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const gender = searchParams.get('gender') || 'all';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setsearchParams(params);
  }

  function handleGenderChange(gender: string) {
    const params = new URLSearchParams(searchParams);

    if (gender === 'all') {
      params.delete('gender');
    } else {
      params.set('gender', gender);
    }

    setsearchParams(params);
  }

  function toggleCenturies(century: string) {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    params.delete('centuries');
    newCenturies.forEach(c => params.append('centuries', c));
    setsearchParams(params);
  }

  const allCenturies = ['16', '17', '18', '19', '20'];

  function toggleAllCenturies() {
    const params = new URLSearchParams(searchParams);
    const allSelected = allCenturies.every(c => centuries.includes(c));

    if (allSelected) {
      params.delete('centuries');
    } else {
      params.delete('centuries');
      allCenturies.forEach(c => params.append('centuries', c));
    }

    setsearchParams(params);
  }

  function clearAllFilters() {
    setsearchParams(new URLSearchParams());
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={gender === 'all' ? 'is-active' : ''}
          onClick={() => handleGenderChange('all')}
        >
          All
        </a>
        <a
          className={gender === 'm' ? 'is-active' : ''}
          onClick={() => handleGenderChange('m')}
        >
          Male
        </a>
        <a
          className={gender === 'f' ? 'is-active' : ''}
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
            value={query}
            onChange={handleQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('16') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('17') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('18') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('18')}
            >
              18
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('19') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${centuries.includes('20') ? 'is-info' : ''}`}
              onClick={() => toggleCenturies('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={toggleAllCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={clearAllFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
