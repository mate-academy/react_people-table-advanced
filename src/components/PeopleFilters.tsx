import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const updateParams = (params: Record<string, string | string[] | null>) => {
    setSearchParams(getSearchWith(searchParams, params));
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    updateParams({
      query: value || null,
    });
  };

  const toggleCentury = (century: string) => {
    const newCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(item => item !== century)
      : [...selectedCenturies, century];

    updateParams({
      centuries: newCenturies.length ? newCenturies : null,
    });
  };

  const handleSexChange = (value: string | null) => {
    updateParams({
      sex: value,
    });
  };

  const resetFilters = () => {
    updateParams({
      query: null,
      sex: null,
      centuries: null,
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <a
          className={!sex ? 'is-active' : ''}
          href="#/people"
          onClick={event => {
            event.preventDefault();
            handleSexChange(null);
          }}
        >
          All
        </a>

        <a
          className={sex === 'm' ? 'is-active' : ''}
          href="#/people?sex=m"
          onClick={event => {
            event.preventDefault();
            handleSexChange('m');
          }}
        >
          Male
        </a>

        <a
          className={sex === 'f' ? 'is-active' : ''}
          href="#/people?sex=f"
          onClick={event => {
            event.preventDefault();
            handleSexChange('f');
          }}
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

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <button
                key={century}
                type="button"
                data-cy="century"
                className={`button mr-1 ${
                  selectedCenturies.includes(String(century)) ? 'is-info' : ''
                }`}
                onClick={() => toggleCentury(String(century))}
              >
                {century}
              </button>
            ))}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={() => updateParams({ centuries: null })}
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
          onClick={resetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
