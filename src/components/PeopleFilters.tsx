import { useSearchParams } from 'react-router-dom';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (value === null || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCenturies = params.getAll('centuries');
    const nextCenturies = currentCenturies.includes(century)
      ? currentCenturies.filter(item => item !== century)
      : [...currentCenturies, century];

    params.delete('centuries');

    nextCenturies.forEach(item => {
      params.append('centuries', item);
    });

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          href="#/people"
          className={!sex ? 'is-active' : ''}
          onClick={event => {
            event.preventDefault();
            updateParam('sex', null);
          }}
        >
          All
        </a>

        <a
          href="#/people?sex=m"
          className={sex === 'm' ? 'is-active' : ''}
          onClick={event => {
            event.preventDefault();
            updateParam('sex', 'm');
          }}
        >
          Male
        </a>

        <a
          href="#/people?sex=f"
          className={sex === 'f' ? 'is-active' : ''}
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
            onChange={event => updateParam('query', event.target.value || null)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => (
              <a
                key={century}
                data-cy="century"
                href={`#/people?centuries=${century}`}
                className={`button mr-1 ${
                  selectedCenturies.includes(century) ? 'is-info' : ''
                }`}
                onClick={event => {
                  event.preventDefault();
                  toggleCentury(century);
                }}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={`button ${
                selectedCenturies.length === 0
                  ? 'is-success'
                  : 'is-success is-outlined'
              }`}
              href="#/people"
              onClick={event => {
                event.preventDefault();

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
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={() => setSearchParams(new URLSearchParams())}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
