import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search') || '';
  const centuries = searchParams.getAll('centuries');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const current = newParams.getAll('centuries');

    if (current.includes(century)) {
      const filtered = current.filter(c => c !== century);

      newParams.delete('centuries');
      filtered.forEach(c => newParams.append('centuries', c));
    } else {
      newParams.append('centuries', century);
    }

    setSearchParams(newParams);
  };

  const resetCenturies = () => {
    const newParams = new URLSearchParams(searchParams);

    newParams.delete('centuries');
    setSearchParams(newParams);
  };

  const resetAll = () => {
    setSearchParams({});
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a className="is-active" href="#/people">
          All
        </a>
        <a className="" href="#/people?sex=m">
          Male
        </a>
        <a className="" href="#/people?sex=f">
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
            value={search}
            onChange={handleNameChange}
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
              <a
                key={c}
                data-cy="century"
                type="button"
                onClick={() => toggleCentury(String(c))}
                className={classNames('button', 'mr-1', {
                  'is-info': centuries.includes(String(c)),
                })}
              >
                {c}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className={classNames('button', 'is-outlined', {
                'is-success': centuries.length === 0,
              })}
              href="#/people"
              onClick={resetCenturies}
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
          onClick={resetAll}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
