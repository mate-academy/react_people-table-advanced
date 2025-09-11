import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  const handleQueryChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const trimmed = value.trim();

    if (trimmed) {
      newParams.set('query', trimmed);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

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
        <label htmlFor="forLabel" className="label">
          Search
        </label>
        <input
          className="input"
          id="forLabel"
          value={query}
          onChange={e => handleQueryChange(e.target.value)}
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
