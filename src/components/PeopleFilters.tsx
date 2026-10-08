import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleQueryChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const toggleCentury = (century: string) => {
    const newParams = new URLSearchParams(searchParams);
    const centuries = newParams.getAll('centuries');

    newParams.delete('centuries');

    (centuries.includes(century)
      ? centuries.filter(item => item !== century)
      : [...centuries, century]
    ).forEach(item => newParams.append('centuries', item));

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!selectedSex ? 'is-active' : ''}
          to="/people"
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={selectedSex === 'm' ? 'is-active' : ''}
          to="/people"
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={selectedSex === 'f' ? 'is-active' : ''}
          to="/people"
          params={{ sex: 'f' }}
        >
          Female
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
            onChange={event => handleQueryChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <button
              data-cy="century"
              type="button"
              className={`button mr-1 ${selectedCenturies.includes('16') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('16')}
            >
              16
            </button>

            <button
              data-cy="century"
              type="button"
              className={`button mr-1 ${selectedCenturies.includes('17') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('17')}
            >
              17
            </button>

            <button
              data-cy="century"
              type="button"
              className={`button mr-1 ${selectedCenturies.includes('18') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('18')}
            >
              18
            </button>

            <button
              data-cy="century"
              type="button"
              className={`button mr-1 ${selectedCenturies.includes('19') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('19')}
            >
              19
            </button>

            <button
              data-cy="century"
              type="button"
              className={`button mr-1 ${selectedCenturies.includes('20') ? 'is-info' : ''}`}
              onClick={() => toggleCentury('20')}
            >
              20
            </button>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          to="/people"
          params={{
            sex: null,
            query: null,
            centuries: null,
            sort: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
