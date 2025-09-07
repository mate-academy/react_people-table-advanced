import React from 'react';

export default function PeopleFilters({ searchParams, setSearchParams }) {
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  };

  const toggleCentury = century => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll('centuries');

    let nextCenturies;

    if (current.includes(century)) {
      nextCenturies = current.filter(c => c !== century);
    } else {
      nextCenturies = [...current, century];
    }

    nextCenturies = Array.from(new Set(nextCenturies));

    params.delete('centuries');
    nextCenturies.forEach(c => params.append('centuries', c));

    setSearchParams(params);
  };

  const clearCenturies = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('centuries');
    setSearchParams(params);
  };

  return (
    <div>
      <h3 className="title is-5">Filters</h3>

      {/* Name filter */}
      <input
        className="input"
        placeholder="Search by name..."
        value={query}
        onChange={e => updateParam('query', e.target.value)}
      />

      {/* Sex filter */}
      <div className="buttons mt-3">
        <button
          className={`button ${!sex ? 'is-info' : ''}`}
          onClick={() => updateParam('sex', '')}
        >
          All
        </button>
        <button
          className={`button ${sex === 'm' ? 'is-info' : ''}`}
          onClick={() => updateParam('sex', 'm')}
        >
          Male
        </button>
        <button
          className={`button ${sex === 'f' ? 'is-info' : ''}`}
          onClick={() => updateParam('sex', 'f')}
        >
          Female
        </button>
      </div>

      {/* Century filter */}
      <div className="buttons mt-3">
        {/* All button for centuries - removes the centuries param entirely */}
        <button
          className={`button ${centuries.length === 0 ? 'is-info' : ''}`}
          onClick={clearCenturies}
        >
          All
        </button>

        {['16', '17', '18', '19', '20'].map(c => (
          <button
            key={c}
            className={`button ${centuries.includes(c) ? 'is-info' : ''}`}
            onClick={() => toggleCentury(c)}
          >
            {c}th
          </button>
        ))}
      </div>
    </div>
  );
}
