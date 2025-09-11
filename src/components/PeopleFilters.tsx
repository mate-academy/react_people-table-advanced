import { useSearchParams } from 'react-router-dom';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSexChange = (sex: string | null) => {
    if (sex) {
      searchParams.set('sex', sex);
    } else {
      searchParams.delete('sex');
    }
    setSearchParams(searchParams);
  };

  const handleCenturyChange = (century: number) => {
    const centuries = searchParams.getAll('centuries');
    if (centuries.includes(String(century))) {
      const newCenturies = centuries.filter(c => c !== String(century));
      searchParams.delete('centuries');
      newCenturies.forEach(c => searchParams.append('centuries', c));
    } else {
      searchParams.append('centuries', String(century));
    }
    setSearchParams(searchParams);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value) {
      searchParams.set('name', value);
    } else {
      searchParams.delete('name');
    }
    setSearchParams(searchParams);
  };

  const resetFilters = () => {
    setSearchParams({});
  };


  const activeCenturies = searchParams.getAll('centuries');

  return (
    <div className="box">
      <h2 className="title is-5">Filters</h2>

      <div className="buttons">
        <p className="panel-tabs" data-cy="SexFilter">
          <a className="is-active" href="#/people" onClick={() => handleSexChange(null)}>
            All
          </a>
          <a className="" href="#/people?sex=m"  onClick={() => handleSexChange('m')}>
            Male
          </a>
          <a className="" href="#/people?sex=f" onClick={() => handleSexChange('f')}>
            Female
          </a>
        </p>
      </div>

      <div className="field">
        <input
          className="input"
          type="text"
          placeholder="Search..."
          defaultValue={searchParams.get('name') || ''}
          onChange={handleSearch}
        />
      </div>

      <div className="buttons">
        {[16, 17, 18, 19, 20].map(c => (
          <button
            key={c}
            className={`button ${activeCenturies.includes(String(c)) ? 'is-link' : ''}`}
            onClick={() => handleCenturyChange(c)}
          >
            {c}
          </button>
        ))}
        <button className="button" onClick={() => setSearchParams({})}>
          All
        </button>
      </div>

      <button className="button is-light is-fullwidth" onClick={resetFilters}>
        Reset all filters
      </button>
    </div>
  );
};
