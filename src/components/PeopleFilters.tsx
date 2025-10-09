/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';
import React from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const trimmed = value.trim();
    const params = new URLSearchParams(searchParams.toString());

    if (trimmed) {
      params.set('query', trimmed);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  const toggleCentury = (century: number) => {
    const params = new URLSearchParams(searchParams);
    const all = params.getAll('centuries');

    if (all.includes(String(century))) {
      const filtered = all.filter(c => c !== String(century));

      params.delete('centuries');
      filtered.forEach(c => params.append('centuries', c));
    } else {
      params.append('centuries', String(century));
    }

    setSearchParams(params);
  };

  const centuryOptions = useMemo(() => [14, 15, 16, 17, 18, 19], []);

  return (
    <aside className="box" data-cy="filters">
      <div className="field">
        <label className="label">Search by name</label>
        <div className="control">
          <input
            data-cy="nameFilter"
            className="input"
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Type a name..."
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Centuries</label>
        <div className="buttons are-small">
          {centuryOptions.map(c => (
            <button
              key={c}
              className={`button ${
                centuries.includes(String(c)) ? 'is-info' : ''
              }`}
              onClick={() => toggleCentury(c)}
              data-cy={`century-${c}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
