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
        <a
          className={classNames({ 'is-active': !sexParam })}
          href="#/people"
          onClick={e => {
            e.preventDefault();
            handleSexFilter(null);
          }}
          data-cy="sexAll"
        >
          All
        </a>
        {Object.entries(Sex).map(([key, value]) => (
          <a
            key={value}
            className={classNames({ 'is-active': sexParam === value })}
            href={`#/people?sex=${value}`}
            onClick={e => {
              e.preventDefault();
              handleSexFilter(value as Sex);
            }}
            data-cy={`sex${key}`}
          >
            {key === 'Male' ? 'Male' : 'Female'}
          </a>
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
              <a
                key={c}
                className={classNames('button mr-1', {
                  'is-info': centuriesParam.includes(c),
                })}
                href={`#/people?centuries=${c}`}
                onClick={e => {
                  e.preventDefault();
                  handleCenturyClick(c as Century);
                }}
                data-cy={`century${c}`}
              >
                {c}
              </a>
            ))}
            <a
              className={classNames('button is-success', {
                'is-outlined': centuriesParam.length > 0,
              })}
              href="#/people"
              onClick={e => {
                e.preventDefault();
                handleAllCenturies();
              }}
              data-cy="centuryALL"
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
          onClick={e => {
            e.preventDefault();
            handleResetAll();
          }}
          data-cy="resetFilters"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
