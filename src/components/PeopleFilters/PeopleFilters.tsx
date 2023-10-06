/* eslint-disable max-len */
import { SearchLink } from '../SearchLink';

interface PeopleFiltersProps {
  setSearchParams: (params: Record<string, any>) => void;
  searchParams: URLSearchParams;
}

const centuriesList = ['16', '17', '18', '19', '20'];

const PeopleFilters: React.FC<PeopleFiltersProps>
= ({ setSearchParams, searchParams }) => {
  const handleNameFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;

    setSearchParams({ ...searchParams, query: query || null });
  };

  const handleCenturyClick = (century: string): string[] => {
    const currentCenturies = searchParams.getAll('centuries').includes(century)
      ? searchParams.getAll('centuries').filter(c => c !== century)
      : [...searchParams.getAll('centuries'), century];

    return currentCenturies;
  };

  const handleSexClick = (sex: string | null) => {
    setSearchParams({ ...searchParams, sex: sex || undefined });
  };

  const getActiveClass = (key: string, value: string) => {
    if (key === 'centuries') {
      return searchParams.getAll(key).includes(value) ? 'is-info' : '';
    }

    return searchParams.get(key) === value ? 'is-active' : '';
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {['All', 'Male', 'Female'].map(label => {
          const sexValue = label === 'All' ? '' : label[0].toLowerCase();

          return (
            <SearchLink
              key={label}
              className={getActiveClass('sex', sexValue)}
              params={{ sex: sexValue }}
              onClick={() => handleSexClick(sexValue)}
            >
              {label}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            onChange={handleNameFilterChange}
            value={searchParams.get('query') || ''}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                className={`button mr-1 ${getActiveClass('centuries', century)}`}
                params={{ centuries: handleCenturyClick(century) }}
                onClick={() => {
                  const updatedCenturies = handleCenturyClick(century);

                  setSearchParams({ ...searchParams, centuries: updatedCenturies });
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink className="button is-success is-outlined" params={{ centuries: [] }}>
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a className="button is-link is-outlined is-fullwidth" href="#/people">
          Reset all filters
        </a>
      </div>
    </nav>
  );
};

export default PeopleFilters;
