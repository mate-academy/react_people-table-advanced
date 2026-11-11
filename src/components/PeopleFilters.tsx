import { Link, useSearchParams } from 'react-router-dom';

const centuries = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCenturyChange = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const selectedCenturies = params.getAll('centuries');

    if (selectedCenturies.includes(century)) {
      params.delete('centuries');
      selectedCenturies
        .filter(item => item !== century)
        .forEach(item => params.append('centuries', item));
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  };

  const handleCenturyReset = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');

    setSearchParams(params);
  };

  const handleRestAll = () => {
    setSearchParams({});
  };

  const updateSex = (sex: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (sex) {
      params.set('sex', sex);
    } else {
      params.delete('sex');
    }

    return params.toString();
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <Link
          className={!searchParams.has('sex') ? 'is-active' : ''}
          to={{
            pathname: '/people',
            search: updateSex(null),
          }}
        >
          All
        </Link>
        <Link
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          to={{
            pathname: '/people',
            search: updateSex('m'),
          }}
        >
          Male
        </Link>
        <Link
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          to={{
            pathname: '/people',
            search: updateSex('f'),
          }}
        >
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
            onChange={event => {
              const params = new URLSearchParams(searchParams);
              const value = event.target.value;

              if (value) {
                params.set('query', value);
              } else {
                params.delete('query');
              }

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
            {centuries.map(century => (
              <button
                key={century}
                data-cy="century"
                className={`button mr-1 ${searchParams.getAll('centuries').includes(century) ? 'is-info' : ''}`}
                onClick={() => handleCenturyChange(century)}
              >
                {century}
              </button>
            ))}
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
