import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedSex = searchParams.get('sex') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (value) {
        params.set('query', value);
      } else {
        params.delete('query');
      }

      return params;
    });
  };

  const toggleCentury = (century: string) => {
    const params = new URLSearchParams(searchParams);
    const centuries = params.getAll('centuries');

    if (centuries.includes(century)) {
      params.delete('centuries');
      centuries
        .filter(c => c !== century)
        .forEach(c => params.append('centuries', c));
    } else {
      params.append('centuries', century);
    }

    setSearchParams(params);
  };

  const handleReset = () => setSearchParams({});

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }}>
          {!selectedSex ? <b>All</b> : 'All'}
        </SearchLink>
        <SearchLink params={{ sex: 'm' }}>
          {selectedSex === 'm' ? <b>Male</b> : 'Male'}
        </SearchLink>
        <SearchLink params={{ sex: 'f' }}>
          {selectedSex === 'f' ? <b>Female</b> : 'Female'}
        </SearchLink>
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
            <i className="fas fa-search" />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <a
                key={century}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(century) ? 'is-info' : ''}`}
                onClick={() => toggleCentury(century)}
              >
                {century}
              </a>
            ))}
          </div>
          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => {
                const params = new URLSearchParams(searchParams);

                params.delete('centuries');
                setSearchParams(params);
              }}
            >
              All
            </a>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          onClick={handleReset}
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
