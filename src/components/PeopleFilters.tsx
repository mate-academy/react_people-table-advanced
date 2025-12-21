import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const selectedCenturies = searchParams.getAll('century');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('query', value);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* Name filter */}
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

      {/* Century filter */}
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURIES.map(century => {
              const isActive = selectedCenturies.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  params={{
                    century: isActive
                      ? selectedCenturies.filter(c => c !== century)
                      : [...selectedCenturies, century],
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      {/* ♻ Reset */}
      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            century: null,
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
