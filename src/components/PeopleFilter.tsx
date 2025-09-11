import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';

enum Sex {
  Male = 'm',
  Female = 'f',
}

enum Century {
  Sixteenth = '16',
  Seventeenth = '17',
  Eighteenth = '18',
  Nineteenth = '19',
  Twentieth = '20',
}

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sexParam = searchParams.get('sex');
  const centuriesParam = searchParams.getAll('centuries');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const next = new URLSearchParams(searchParams.toString());

    if (value.trim() === '') {
      next.delete('query');
    } else {
      next.set('query', value);
    }

    setSearchParams(next);
  };

  const handleSexFilter = (value: Sex | null) => {
    const next = new URLSearchParams(searchParams.toString());

    if (value === null) {
      next.delete('sex');
    } else {
      next.set('sex', value);
    }

    setSearchParams(next);
  };

  const handleCenturyClick = (century: Century) => {
    const next = new URLSearchParams(searchParams.toString());
    const current = next.getAll('centuries');

    if (current.includes(century)) {
      const filtered = current.filter(c => c !== century);

      next.delete('centuries');
      filtered.forEach(c => next.append('centuries', c));
    } else {
      next.append('centuries', century);
    }

    setSearchParams(next);
  };

  const handleAllCenturies = () => {
    const next = new URLSearchParams(searchParams.toString());

    next.delete('centuries');
    setSearchParams(next);
  };

  const handleResetAll = () => setSearchParams(new URLSearchParams());

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          type="button"
          className={classNames({ 'is-active': !sexParam })}
          onClick={() => handleSexFilter(null)}
          data-cy="sexAll"
        >
          All
        </button>
        {Object.entries(Sex).map(([key, value]) => (
          <button
            key={value}
            type="button"
            className={classNames({ 'is-active': sexParam === value })}
            onClick={() => handleSexFilter(value as Sex)}
            data-cy={`sex${key}`}
          >
            {key === 'Male' ? 'Male' : 'Female'}
          </button>
        ))}
      </p>

      <div className="panel-block">
        <input
          type="search"
          className="input"
          placeholder="Search by name"
          value={query}
          onChange={handleQueryChange}
          data-cy="searchInput"
        />
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {Object.values(Century).map(c => (
              <button
                key={c}
                type="button"
                className={classNames('button mr-1', {
                  'is-info': centuriesParam.includes(c),
                })}
                onClick={() => handleCenturyClick(c as Century)}
                data-cy={`century${c}`}
              >
                {c}
              </button>
            ))}
            <button
              type="button"
              className={classNames('button is-success', {
                'is-outlined': centuriesParam.length > 0,
              })}
              onClick={handleAllCenturies}
              data-cy="centuryALL"
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
          onClick={handleResetAll}
          data-cy="resetFilters"
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
