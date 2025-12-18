import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex');
  const centuries = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value) {
      searchParams.delete('query');
    } else {
      searchParams.set('query', value);
    }

    setSearchParams(searchParams);
  };

  const handleSexChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (!value) {
      searchParams.delete('sex');
    } else {
      searchParams.set('sex', value);
    }

    setSearchParams(searchParams);
  };

  const handleCenturyChange = (century: string) => {
    const current = searchParams.getAll('centuries');

    if (current.includes(century)) {
      const filtered = current.filter(c => c !== century);

      searchParams.delete('centuries');
      filtered.forEach(c => searchParams.append('centuries', c));
    } else {
      searchParams.append('centuries', century);
    }

    setSearchParams(searchParams);
  };

  const handleReset = () => {
    searchParams.delete('query');
    searchParams.delete('sex');
    searchParams.delete('centuries');
    setSearchParams(searchParams);
  };

  return (
    <div className="box">
      <p className="subtitle is-5">Filters</p>

      <div className="field">
        <label htmlFor="name-filter" className="label">Name</label>

        <div className="control">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
      </div>

      <div className="field">
        <label htmlFor="sex-filter" className="label">Sex</label>

        <div className="control">
          <div className="select is-fullwidth">
            <select
              data-cy="SexFilter"
              value={sex || ''}
              onChange={handleSexChange}
            >
              <option value="">All</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <p className="label">Century</p>

        <div className="buttons">
          {['16', '17', '18', '19', '20'].map(century => (
            <button
              key={century}
              type="button"
              data-cy="CenturyFilter"
              className={`button ${
                centuries.includes(century) ? 'is-info' : ''
              }`}
              onClick={() => handleCenturyChange(century)}
            >
              {century}
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <button type="button" className="button is-light" onClick={handleReset}>
          Reset all filters
        </button>
      </div>
    </div>
  );
};
