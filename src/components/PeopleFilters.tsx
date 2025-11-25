import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries');

  const allCenturies = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: '' }}
          className={sex === '' ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={sex === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={sex === 'f' ? 'is-active' : ''}
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
            onChange={e => {
              const value = e.target.value.trim();
              const newParams = new URLSearchParams(searchParams.toString());

              if (value) {
                newParams.set('query', value);
              } else {
                newParams.delete('query');
              }

              setSearchParams(newParams);
            }}
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true"></i>
          </span>
        </p>
      </div>

      <div className="panel-block" data-cy="CenturyFilter">
        <div className="level is-flex-grow-1 is-mobile">
          <div className="level-left">
            {allCenturies.map(c => (
              <SearchLink
                key={c}
                params={{
                  centuries: centuries.includes(c)
                    ? centuries.filter(cent => cent !== c)
                    : [...centuries, c],
                }}
                className={`button mr-1 ${centuries.includes(c) ? 'is-info' : ''}`}
              >
                {c}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
              className={`button is-outlined ${centuries.length === 0 ? 'is-success' : ''}`}
              data-cy="centuryALL"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: [] }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
