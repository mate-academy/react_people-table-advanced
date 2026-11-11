import { Link, useSearchParams } from "react-router-dom";

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCenturyChange = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const centuries = params.getAll('centuries');
    if (centuries.includes(century)) {
      params.delete('centuries');
      centuries
        .filter(item => item !== century)
        .forEach(item => params.append('centuries', item))
    } else {
      params.append('centuries', century);
    }
    setSearchParams(params);
  }

  const handleCenturyReset = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries')

    setSearchParams(params);
  }

  const handleRestAll = () => {
    setSearchParams({});
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link className={!searchParams.has('sex') ? 'is-active' : ''} to="/people">
          All
        </Link>
        <Link className={searchParams.get('sex') === 'm' ? 'is-active' : ''} to="/people?sex=m">
          Male
        </Link>
        <Link className={searchParams.get('sex') === 'f' ? 'is-active' : ''} to="/people?sex=f">
          Female
        </Link>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchParams.get('query') || ''}
            onChange={(event) => {
              const params = new URLSearchParams(searchParams);

              params.set('query', event.target.value);
              setSearchParams(params);
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
            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('16') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('17') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('18') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('18')}
            >
              18
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('19') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              className={`button mr-1 ${searchParams.getAll('centuries').includes('20') ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => handleCenturyReset()}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={() => {
            handleRestAll();
          }}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
