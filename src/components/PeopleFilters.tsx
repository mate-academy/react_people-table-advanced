import { useSearchParams } from 'react-router-dom';
import { centuries } from './AddOns/centuries';
import { sexes } from './AddOns/sexes';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex');
  const centuryFilter = searchParams.getAll('centuries');
  const queryFilter = searchParams.get('query') || '';

  const setSexFilter = (sex: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (sex) {
      newParams.set('sex', sex);
    } else {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  };

  const setCenturyFilter = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const selected = newParams.getAll('centuries');

    if (selected.includes(century)) {
      const updated = selected.filter(c => c !== century);

      newParams.delete('centuries');
      updated.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const setQueryFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {sexes.map(({ label, value }) => {
          const isActive = sexFilter === value;

          return (
            <a
              key={label}
              className={isActive ? 'is-active' : ''}
              onClick={() => setSexFilter(value)}
            >
              {label}
            </a>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            value={queryFilter}
            onChange={setQueryFilter}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuries.map(century => {
              const isActive = centuryFilter.includes(century.toString());

              return (
                <button
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  onClick={() => setCenturyFilter(century.toString())}
                >
                  {century}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
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
