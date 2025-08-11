export const PeopleFilters = ({
  centuries,
  genderFilter,
  searchParams,
  query,
  setSearchParams,
}) => {
  const handleFillter = field => {
    const params = new URLSearchParams(searchParams);

    params.set('sex', field);
    setSearchParams(params);
  };

  const handleReset = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    params.delete('query');
    params.delete('sex');
    setSearchParams(params);
  };

  const toggleCentury = (century: number) => {
    const params = new URLSearchParams(searchParams);
    const newCenturies = centuries.includes(century)
      ? centuries.filter(cn => cn !== century)
      : [...centuries, century];

    params.delete('centuries');

    newCenturies.forEach(centur => params.append('centuries', centur));

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={genderFilter === null ? 'is-active' : ''}
          href="#/people"
          onClick={e => {
            e.preventDefault();
            handleFillter(null);
          }}
        >
          All
        </a>
        <a
          className={genderFilter === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={e => {
            e.preventDefault();
            handleFillter('m');
          }}
        >
          Male
        </a>
        <a
          className={genderFilter === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
          onClick={e => {
            e.preventDefault();
            handleFillter('f');
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
            onChange={event => {
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
            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(16) ? 'is-info' : ''}`}
              href="#/people?centuries=16"
              onClick={e => {
                e.preventDefault();
                toggleCentury(16);
              }}
            >
              16
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(17) ? 'is-info' : ''}`}
              href="#/people?centuries=17"
              onClick={e => {
                e.preventDefault();
                toggleCentury(17);
              }}
            >
              17
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(18) ? 'is-info' : ''}`}
              href="#/people?centuries=18"
              onClick={e => {
                e.preventDefault();
                toggleCentury(18);
              }}
            >
              18
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(19) ? 'is-info' : ''}`}
              href="#/people?centuries=19"
              onClick={e => {
                e.preventDefault();
                toggleCentury(19);
              }}
            >
              19
            </a>

            <a
              data-cy="century"
              className={`button mr-1 ${centuries.includes(20) ? 'is-info' : ''}`}
              href="#/people?centuries=20"
              onClick={e => {
                e.preventDefault();
                toggleCentury(20);
              }}
            >
              20
            </a>
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={
                centuries.length > 0
                  ? 'button is-success'
                  : 'button is-success is-outlined'
              }
              href="#/people"
              onClick={e => {
                e.preventDefault();
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
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
          href="#/people"
          onClick={handleReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
