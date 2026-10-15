import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const SEX_FILTERS = [
  { label: 'All', value: null },
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' },
];

const CENTURY_FILTERS = [
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSex = searchParams.get('sex');
  const currentCentury = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const newParams = new URLSearchParams(searchParams);

    if (value) {
      newParams.set('query', value);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTERS.map(({ label, value }) => {
          const isActive = value === null ? !currentSex : currentSex === value;

          return (
            <SearchLink
              key={label}
              className={isActive ? 'is-active' : ''}
              params={{ sex: value }}
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
            value={query} // Контрольований інпут (відображає текст із URL)
            onChange={handleSearchChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {CENTURY_FILTERS.map(({ label, value }) => {
              let isActive = false;

              if (value === null) {
                isActive = !currentCentury || currentCentury.length === 0;
              } else {
                isActive = currentCentury?.includes(value) ?? false;
              }

              return (
                <SearchLink
                  data-cy="century"
                  key={label}
                  className={`button mr-1 ${isActive ? 'is-info' : ''}`}
                  params={{
                    centuries: currentCentury?.includes(value)
                      ? currentCentury.filter(century => century !== value)
                      : [...currentCentury, value],
                  }}
                >
                  {label}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: null }}
            >
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
