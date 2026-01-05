import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    const newSearch = getSearchWith(searchParams, {
      query: newQuery === '' ? null : newQuery,
    });

    setSearchParams(newSearch);
  };

  const toggleCentury = (century: string) => {
    const current = searchParams.getAll('centuries');
    const isSelected = current.includes(century);

    const next = isSelected
      ? current.filter(c => c !== century)
      : [...current, century];

    const newSearch = getSearchWith(searchParams, {
      centuries: next.length ? next : null,
    });

    setSearchParams(newSearch);
  };

  const handleAllCenturies = () => {
    const newSearch = getSearchWith(searchParams, {
      centuries: null,
    });

    setSearchParams(newSearch);
  };

  const handleResetFilters = () => {
    const newSearch = getSearchWith(searchParams, {
      sex: null,
      query: null,
      centuries: null,
      sort: null,
      order: null,
    });

    setSearchParams(newSearch);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={currentSex === null ? 'is-active' : ''}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={currentSex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={currentSex === 'f' ? 'is-active' : ''}
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
            value={currentQuery}
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
            {centuriesList.map(century => {
              const isSelected = selectedCenturies.includes(century);

              return (
                <button
                  key={century}
                  type="button"
                  data-cy="century"
                  className={`button mr-1 ${isSelected ? 'is-info' : ''}`}
                  onClick={() => toggleCentury(century)}
                >
                  {century}
                </button>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <button
              type="button"
              data-cy="centuryALL"
              className="button is-success is-outlined"
              onClick={handleAllCenturies}
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
          onClick={handleResetFilters}
        >
          Reset all filters
        </button>
      </div>
    </nav>
  );
};
