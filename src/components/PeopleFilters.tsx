import { useSearchParams } from 'react-router-dom';
import { ChangeEvent } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const handleCenturyChange = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const current = newParams.getAll('centuries');

    newParams.delete('centuries');

    const updated = current.includes(century)
      ? current.filter(c => c !== century)
      : [...current, century];

    updated.forEach(c => newParams.append('centuries', c));

    setSearchParams(newParams);
  };

  const resetAll = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

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
            {['16', '17', '18', '19', '20'].map(c => {
              const isActive = centuries.includes(c);

              return (
                <button
                  key={c}
                  data-cy="century"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  onClick={() => handleCenturyChange(c)}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={resetAll}
            >
              All
            </button>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
