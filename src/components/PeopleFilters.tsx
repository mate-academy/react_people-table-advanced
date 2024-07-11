import classNames from 'classnames';

type Props = {
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  query: string;
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  query,
}) => {
  const initialCenturies = ['16', '17', '18', '19', '20'];

  function handleFilterFieldChange(filterField: string) {
    const params = new URLSearchParams(searchParams);

    params.set('filterField', filterField);
    setSearchParams(params);
  }

  const currentFilter = searchParams.get('filterField') || 'all';

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  }

  function handleCenturiesChange(ch: string) {
    const params = new URLSearchParams(searchParams);
    const centuries = searchParams.getAll('centuries') || [];

    const newCenturies = centuries.includes(ch)
      ? centuries.filter(cen => cen !== ch)
      : [...centuries, ch];

    params.delete('centuries');

    newCenturies.forEach(centure => params.append('centuries', centure));
    setSearchParams(params);
  }

  function handleAllCenturiesChange() {
    const params = new URLSearchParams(searchParams);
    const centuries = searchParams.getAll('centuries') || [];

    if (centuries.length === initialCenturies.length) {
      params.delete('centuries');
    } else {
      params.delete('centuries');

      initialCenturies.forEach(c => {
        params.append('centuries', c);
      });
    }

    setSearchParams(params);
  }

  const currentCenturies = searchParams.getAll('centuries');

  function handleClear() {
    const params = new URLSearchParams(searchParams);

    params.delete('filterField');
    params.delete('query');
    params.delete('centuries');
    setSearchParams(params);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={currentFilter === 'all' ? 'is-active' : ''}
          href="#/people"
          onClick={e => {
            e.preventDefault();
            handleFilterFieldChange('all');
          }}
        >
          All
        </a>
        <a
          className={currentFilter === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={e => {
            e.preventDefault();
            handleFilterFieldChange('m');
          }}
        >
          Male
        </a>
        <a
          className={currentFilter === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
          onClick={e => {
            e.preventDefault();
            handleFilterFieldChange('f');
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
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {initialCenturies.map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': currentCenturies.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                onClick={e => {
                  e.preventDefault();
                  handleCenturiesChange(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={e => {
                e.preventDefault();
                handleAllCenturiesChange();
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
          onClick={handleClear}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
