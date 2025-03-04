import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { filter } from 'cypress/types/bluebird';
import { sortBy } from 'cypress/types/lodash';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currensSex = searchParams.get('sex');
  const currentCentury = searchParams.getAll('century');

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearchParams(prev => {
      if (value) {
        prev.set('filter', value);
      } else {
        prev.delete('filter');
      }

      return prev;
    });
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!currensSex ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={currensSex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={currensSex === 'f' ? 'is-active' : ''}
          params={{ sex: 'f' }}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            type="text"
            data-cy="NameFilter"
            placeholder="Search"
            value={searchParams.get('filter') || ''}
            onChange={handleFilterChange}
            className="input"
            style={{ paddingRight: '2.5rem' }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>

          {searchParams.get('filter') && (
            <span
              className="icon is-right is-clickable"
              style={{
                position: 'absolute',
                right: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSearchParams(prev => {
                  prev.delete('filter');

                  return prev;
                });
              }}
            >
              <i className="fas fa-times" aria-hidden="true" />
            </span>
          )}
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {[16, 17, 18, 19, 20].map(century => (
              <SearchLink
                key={century}
                className={`button mr-1 ${currentCentury.includes(String(century)) ? 'is-info' : ''}`}
                params={{
                  century: currentCentury.includes(String(century))
                    ? currentCentury.filter(c => c !== String(century))
                    : [...currentCentury, String(century)],
                }}
                data-cy="century"
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ century: [] }}
              className="button is-success is-outlined"
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            filter: null,
            sex: null,
            century: null,
            sortBy: null,
            order: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
