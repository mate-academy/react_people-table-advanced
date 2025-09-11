import React, { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

type Props = {
  peopleLoaded?: boolean;
};

export const PeopleFilters: React.FC<Props> = ({ peopleLoaded }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = (params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  };

  // Name filter
  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();

    updateParams({ query: value || null });
  };

  // Sex filter
  const handleSex = (sex: string | null) => updateParams({ sex });

  // Century filter
  const handleCentury = (century: string) => {
    const current = searchParams.getAll('centuries');
    const newCenturies = current.includes(century)
      ? current.filter(c => c !== century)
      : [...current, century];

    updateParams({ centuries: newCenturies.length ? newCenturies : null });
  };

  // Reset all
  const handleReset = () =>
    updateParams({ query: null, sex: null, centuries: null });

  const selectedCenturies = searchParams.getAll('centuries');
  const centuriesList = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Sex filter */}
      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!searchParams.get('sex') ? 'is-active' : ''}
          onClick={() => handleSex(null)}
        >
          All
        </a>
        <a
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
          onClick={() => handleSex('m')}
        >
          Male
        </a>
        <a
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
          onClick={() => handleSex('f')}
        >
          Female
        </a>
      </p>

      {/* Name filter */}
      <div className="panel-block">
        <p className="control has-icons-left" style={{ width: '100%' }}>
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            defaultValue={searchParams.get('query') || ''}
            onChange={handleQueryChange}
            disabled={!peopleLoaded}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block" data-cy="CenturyFilter">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            flexWrap: 'nowrap',
            gap: '0.25rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'nowrap' }}>
            {centuriesList.map(c => (
              <button
                key={c}
                className={`button ${selectedCenturies.includes(c) ? 'is-info' : ''}`}
                onClick={() => handleCentury(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ flexShrink: 0 }}>
            <button
              className="button is-success is-outlined"
              onClick={() => updateParams({ centuries: null })}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {/* Reset all filters */}
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
