import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

const CENTURIES = [16, 17, 18, 19, 20];

export const PeopleFilters: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const sp = useMemo(() => new URLSearchParams(search), [search]);

  const sex = sp.get('sex');
  const queryFromUrl = sp.get('query') || '';
  const selectedCenturies = sp.getAll('centuries').map(Number);

  const [q, setQ] = useState(queryFromUrl);

  useEffect(() => {
    setQ(queryFromUrl);
  }, [queryFromUrl]);

  const gotoWith = (update: SearchParams) => {
    const next = getSearchWith(sp, update);

    navigate({ search: next ? `?${next}` : '' });
  };

  const onSexChange = (next: 'm' | 'f' | null) => {
    gotoWith({ sex: next });
  };

  const onQueryChange = (value: string) => {
    const trimmed = value.trimStart();
    const urlValue = trimmed.trim();

    setQ(trimmed);
    gotoWith({ query: urlValue ? urlValue : null });
  };

  const toggleCentury = (c: number) => {
    const has = selectedCenturies.includes(c);
    const next = has
      ? selectedCenturies.filter(x => x !== c)
      : [...selectedCenturies, c];

    gotoWith({
      centuries: next.length ? next.map(String) : null,
    });
  };

  const clearCenturies = () => gotoWith({ centuries: null });

  const resetAll = () => {
    setQ('');
    gotoWith({
      sex: null,
      query: null,
      centuries: null,
      sort: null,
      order: null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <button
          type="button"
          className={`button is-white ${!sex ? 'is-active' : ''}`}
          onClick={() => onSexChange(null)}
        >
          All
        </button>
        <button
          type="button"
          className={`button is-white ${sex === 'm' ? 'is-active' : ''}`}
          onClick={() => onSexChange('m')}
        >
          Male
        </button>
        <button
          type="button"
          className={`button is-white ${sex === 'f' ? 'is-active' : ''}`}
          onClick={() => onSexChange('f')}
        >
          Female
        </button>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left is-flex-grow-1">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={q}
            onChange={e => onQueryChange(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(c => {
              const active = selectedCenturies.includes(c);

              return (
                <button
                  key={c}
                  data-cy="century"
                  type="button"
                  className={`button mr-1 ${active ? 'is-info' : ''}`}
                  onClick={() => toggleCentury(c)}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              data-cy="centuryALL"
              type="button"
              className="button is-success is-outlined"
              onClick={clearCenturies}
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
          onClick={resetAll}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
