import { getSearchWith } from '../utils/searchHelper';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import cn from 'classnames';

const CENTURIES = ['16', '17', '18', '19', '20'];
const SEX_FILTERS = [
  { value: null, label: 'All' },
  { value: 'm', label: 'Male' },
  { value: 'f', label: 'Female' },
];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries');
  const sex = searchParams.get('sex');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();

    setSearchParams(getSearchWith(searchParams, { query: value || null }));
  };

  const getCenturyButtonClass = (century: string) => {
    return cn('button mr-1', { 'is-info': centuries.includes(century) });
  };

  const getCenturyParams = (century: string) => {
    if (centuries.includes(century)) {
      return centuries.filter(currentCentury => currentCentury !== century);
    } else {
      return [...centuries, century];
    }
  };

  const getSexFilterClass = (sexValue: string | null) => {
    return sex === sexValue ? 'is-active' : '';
  };

  const handleResetFilters = () => {
    setSearchParams('');
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {SEX_FILTERS.map(({ value, label }) => (
          <SearchLink
            key={label}
            params={{ sex: value }}
            className={getSexFilterClass(value)}
          >
            {label}
          </SearchLink>
        ))}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={searchQuery}
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
            {CENTURIES.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={getCenturyButtonClass(century)}
                params={{ centuries: getCenturyParams(century) }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': centuries.length > 0,
              })}
              params={{ centuries: [] }}
            >
              All
            </SearchLink>
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
