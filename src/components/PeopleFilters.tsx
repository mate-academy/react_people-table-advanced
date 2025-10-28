import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();

    setSearchParams(getSearchWith(searchParams, { query: value || null }));
  }

  function handleSexChange(value: 'm' | 'f' | null) {
    setSearchParams(getSearchWith(searchParams, { sex: value }));
  }

  function handleCenturyChange(century: string) {
    const newCenturies = centuries.includes(century)
      ? centuries.filter(c => c !== century)
      : [...centuries, century];

    setSearchParams(
      getSearchWith(searchParams, {
        centuries: newCenturies.length ? newCenturies : null,
      }),
    );
  }

  function handleReset() {
    setSearchParams({});
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          onClick={() => handleSexChange(null)}
        >
          All
        </a>
        <a
          className={sex === 'm' ? 'is-active' : ''}
          onClick={() => handleSexChange('m')}
        >
          Male
        </a>
        <a
          className={sex === 'f' ? 'is-active' : ''}
          onClick={() => handleSexChange('f')}
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
            onChange={handleQueryChange}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block" data-cy="CenturyFilter">
        <div className="buttons">
          {['16', '17', '18', '19', '20'].map(c => (
            <button
              key={c}
              data-cy="century"
              className={`button ${centuries.includes(c) ? 'is-info' : ''}`}
              onClick={() => handleCenturyChange(c)}
            >
              {c}
            </button>
          ))}
          <button
            data-cy="centuryALL"
            className="button is-success is-outlined"
            onClick={() =>
              setSearchParams(getSearchWith(searchParams, { centuries: null }))
            }
          >
            All
          </button>
        </div>
      </div>

      <div className="panel-block">
        <button
          className="button is-link is-outlined is-fullwidth"
          onClick={handleReset}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
