import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);

    if (query) {
      newParams.set('query', query);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  }, [query, searchParams, setSearchParams]);

  const updateParam = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    setSearchParams(newParams);
  };

  const toggleCentury = (century: number) => {
    const newParams = new URLSearchParams(searchParams);
    const centuries = newParams.getAll('centuries');
    const exists = centuries.includes(String(century));

    newParams.delete('centuries');

    const newValues = exists
      ? centuries.filter(c => c !== String(century))
      : [...centuries, String(century)];

    newValues.forEach(c => newParams.append('centuries', c));
    setSearchParams(newParams);
  };

  return (
    <div className="box">
      <div className="field">
        <label htmlFor={`forLabel`} className="label">
          Search
        </label>
        <input
          className="input"
          value={query}
          id={`forLabel`}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="buttons">
        <button className="button" onClick={() => updateParam('sex', null)}>
          All
        </button>
        <button className="button" onClick={() => updateParam('sex', 'm')}>
          Male
        </button>
        <button className="button" onClick={() => updateParam('sex', 'f')}>
          Female
        </button>
      </div>

      <div className="buttons">
        {[16, 17, 18, 19, 20].map(c => (
          <button key={c} className="button" onClick={() => toggleCentury(c)}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
};
