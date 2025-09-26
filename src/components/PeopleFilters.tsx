import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const sex = searchParams.get('sex');
  const setSex = (value: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('sex', value);
    } else {
      newParams.delete('sex');
    }

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const centuries = newParams.getAll('centuries');

    if (centuries.includes(century)) {
      newParams.delete('centuries');
      centuries
        .filter(c => c !== century)
        .forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const resetFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const centuries = searchParams.getAll('centuries');

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <div className="panel-tabs" data-cy="SexFilter">
        <button
          type="button"
          className={`button ${!sex ? 'is-active' : ''}`}
          onClick={() => setSex(null)}
        >
          All
        </button>
        <button
          type="button"
          className={`button ${sex === 'm' ? 'is-active' : ''}`}
          onClick={() => setSex('m')}
        >
          Male
        </button>
        <button
          type="button"
          className={`button ${sex === 'f' ? 'is-active' : ''}`}
          onClick={() => setSex('f')}
        >
          Female
        </button>
      </div>

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
            {[16, 17, 18, 19, 20].map(c => (
              <button
                key={c}
                type="button"
                data-cy="century"
                className={`button mr-1 ${
                  centuries.includes(String(c)) ? 'is-info' : ''
                }`}
                onClick={() => toggleCentury(String(c))}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.delete('centuries');
                setSearchParams(newParams);
              }}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          type="button"
          className="button is-link is-outlined is-fullwidth"
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
