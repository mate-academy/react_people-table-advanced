import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCenturies = searchParams.getAll('centuries');

  const sex = searchParams.get('sex') || 'all';

  const setSex = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === 'all') {
      params.delete('sex');
    } else {
      params.set('sex', value);
    }

    setSearchParams(params);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    const value = e.target.value;

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const toggleCentury = (value: number) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');
    const strValue = String(value);

    if (current.includes(strValue)) {
      const updated = current.filter(c => c !== strValue);

      params.delete('centuries');
      updated.forEach(c => params.append('centuries', c));
    } else {
      params.append('centuries', strValue);
    }

    setSearchParams(params);
  };

  const isSelected = (value: number) =>
    selectedCenturies.includes(String(value));

  const resetCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={sex === 'all' ? 'is-active' : ''}
          onClick={() => setSex('all')}
        >
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
            value={searchParams.get('query') || ''}
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
            <a
              data-cy="century"
              className={`button mr-1 ${isSelected(16) ? 'is-info' : ''}`}
              onClick={() => toggleCentury(16)}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${isSelected(17) ? 'is-info' : ''}`}
              onClick={() => toggleCentury(17)}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${isSelected(18) ? 'is-info' : ''}`}
              onClick={() => toggleCentury(18)}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${isSelected(19) ? 'is-info' : ''}`}
              onClick={() => toggleCentury(19)}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${isSelected(20) ? 'is-info' : ''}`}
              onClick={() => toggleCentury(20)}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button is-success ${selectedCenturies.length !== 0 ? 'is-outlined' : ''}`}
              onClick={resetCenturies}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
