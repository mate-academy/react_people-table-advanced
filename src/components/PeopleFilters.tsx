import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const updateParams = (updates: Record<string, string | string[] | null>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) {
        newParams.delete(key);
      } else if (Array.isArray(value)) {
        newParams.delete(key);

        value.forEach(item => {
          newParams.append(key, item);
        });
      } else {
        newParams.set(key, value);
      }
    });

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const centuries = searchParams.getAll('centuries');

    if (centuries.includes(century)) {
      const newCenturies = centuries.filter(item => item !== century);

      updateParams({
        centuries: newCenturies.length > 0 ? newCenturies : null,
      });
    } else {
      updateParams({
        centuries: [...centuries, century],
      });
    }
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            updateParams({ sex: null });
          }}
        >
          All
        </a>

        <a
          className={sex === 'm' ? 'is-active' : ''}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            updateParams({ sex: 'm' });
          }}
        >
          Male
        </a>

        <a
          className={sex === 'f' ? 'is-active' : ''}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            updateParams({ sex: 'f' });
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
              const value = event.target.value;

              updateParams({
                query: value || null,
              });
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
            {[16, 17, 18, 19, 20].map(century => {
              const centuryString = String(century);
              const isSelected = selectedCenturies.includes(centuryString);

              return (
                <a
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  href="#/people"
                  onClick={event => {
                    event.preventDefault();
                    toggleCentury(centuryString);
                  }}
                >
                  {century}
                </a>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
              onClick={event => {
                event.preventDefault();
                updateParams({ centuries: null });
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
          onClick={event => {
            event.preventDefault();

            updateParams({
              sex: null,
              query: null,
              centuries: null,
            });
          }}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
