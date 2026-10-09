import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const toggleCentury = (century: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (centuries.includes(century)) {
      const updatedCenturies = centuries.filter(item => item !== century);

      newSearchParams.delete('centuries');

      updatedCenturies.forEach(item => {
        newSearchParams.append('centuries', item);
      });
    } else {
      newSearchParams.append('centuries', century);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          onClick={() => {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.delete('sex');
            setSearchParams(newSearchParams);
          }}
        >
          All
        </a>

        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.set('sex', 'm');
            setSearchParams(newSearchParams);
          }}
        >
          Male
        </a>

        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => {
            const newSearchParams = new URLSearchParams(searchParams);

            newSearchParams.set('sex', 'f');
            setSearchParams(newSearchParams);
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
              const newQuery = event.target.value;
              const newSearchParams = new URLSearchParams(searchParams);

              if (newQuery) {
                newSearchParams.set('query', newQuery);
              } else {
                newSearchParams.delete('query');
              }

              setSearchParams(newSearchParams);
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
            {['16', '17', '18', '19', '20'].map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${
                  centuries.includes(century) ? 'is-info' : ''
                }`}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams);

                newSearchParams.delete('centuries');
                setSearchParams(newSearchParams);
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
          onClick={() => setSearchParams({})}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
