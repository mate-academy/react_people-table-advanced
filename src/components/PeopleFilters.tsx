import classNames from 'classnames';
import React from 'react';
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

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';
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

  const handleSexFilter = (
    e: React.MouseEvent<HTMLAnchorElement>,
    value: Sex | null,
  ) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams.toString());

    if (value === null) {
      next.delete('sex');
    } else {
      next.set('sex', value);
    }

    setSearchParams(next);
  };

  const handleCenturyClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    century: Century,
  ) => {
    e.preventDefault();
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

  const handleAllCentury = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);

    next.delete('centuries');
    setSearchParams(next);
  };

  const handleAllReset = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setSearchParams(new URLSearchParams());
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={classNames({ 'is-active': !sexParam })}
          href="#/people"
          onClick={e => handleSexFilter(e, null)}
        >
          All
        </a>
        {Object.entries(Sex).map(([key, value]) => (
          <a
            key={value}
            className={classNames({ 'is-active': sexParam === value })}
            href={`#/people?sex=${value}`}
            onClick={e => handleSexFilter(e, value as Sex)}
          >
            {key === 'Male' ? 'Male' : 'Female'}
          </a>
        ))}
      </p>

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
            {Object.values(Century).map(century => (
              <a
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': centuriesParam.includes(century),
                })}
                href={`#/people?centuries=${century}`}
                onClick={e => handleCenturyClick(e, century as Century)}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': centuriesParam.length > 0,
              })}
              href="#/people"
              onClick={e => handleAllCentury(e)}
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
          onClick={e => handleAllReset(e)}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
