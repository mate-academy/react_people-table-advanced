import classNames from 'classnames';

type Props = {
  searchParams: {};
  setSearchParams: (a: {}) => void;
  query: string;
  sex: string;
  centryParams: string[];
};

export const PeopleFilters: React.FC<Props> = ({
  searchParams,
  setSearchParams,
  query,
  sex,
  centryParams,
}) => {
  const centries = ['16', '17', '18', '19', '20'];

  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);
    setSearchParams(params);
  };

  const handleSexChange = (sexParam: string) => {
    const params = new URLSearchParams(searchParams);

    params.delete('sex');
    if (sexParam !== 'all') {
      params.set('sex', sexParam);
    }

    setSearchParams(params);
  };

  const toggleCentry = (centry: string) => {
    const params = new URLSearchParams(searchParams);

    const newCentries = centryParams.includes(centry)
      ? centryParams.filter(cr => cr !== centry)
      : [...centryParams, centry];

    params.delete('centry');
    newCentries.forEach(cr => params.append('centry', cr));

    setSearchParams(params);
  };

  const clearCentryParams = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centry');
    setSearchParams(params);
  };

  const resetALLFilters = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('query');
    params.delete('sex');
    params.delete('centry');

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !sex })}
          onClick={() => handleSexChange('all')}
        >
          All
        </a>
        <a
          className={classNames({ 'is-active': sex === 'm' })}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={classNames({ 'is-active': sex === 'f' })}
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
            onChange={handleQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centries.map(centry => (
              <a
                key={centry}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centryParams.includes(centry),
                })}
                onClick={() => toggleCentry(centry)}
              >
                {centry}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centryParams.length !== 0,
              })}
              onClick={clearCentryParams}
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={resetALLFilters}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
