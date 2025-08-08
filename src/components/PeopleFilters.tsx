import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || null;
  const centuries = searchParams.getAll('centuries') || [];

  const toggleCenturyParams = (century: string): { centuries: string[] } => {
    return centuries.includes(century)
      ? { centuries: centuries.filter(c => c !== century) }
      : { centuries: [...centuries, century] };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={sex === null ? 'is-active' : ''}
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
              const newValue = e.target.value.trim();
              const newSearchParams = new URLSearchParams(searchParams);

              if (newValue) {
                newSearchParams.set('query', newValue);
              } else {
                newSearchParams.delete('query');
              }

              setSearchParams(newSearchParams);
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <SearchLink
              params={toggleCenturyParams('16')}
              className={`button mr-1${centuries.includes('16') ? ' is-info' : ''}`}
            >
              16
            </SearchLink>
            <SearchLink
              params={toggleCenturyParams('17')}
              className={`button mr-1${centuries.includes('17') ? ' is-info' : ''}`}
            >
              17
            </SearchLink>
            <SearchLink
              params={toggleCenturyParams('18')}
              className={`button mr-1${centuries.includes('18') ? ' is-info' : ''}`}
            >
              18
            </SearchLink>
            <SearchLink
              params={toggleCenturyParams('19')}
              className={`button mr-1${centuries.includes('19') ? ' is-info' : ''}`}
            >
              19
            </SearchLink>
            <SearchLink
              params={toggleCenturyParams('20')}
              className={`button mr-1${centuries.includes('20') ? ' is-info' : ''}`}
            >
              20
            </SearchLink>
            <div className="level-right ml-4">
              <SearchLink
                params={{ centuries: null }}
                className={
                  centuries.length === 0
                    ? 'button is-success'
                    : 'button is-success is-outlined'
                }
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{
            query: null,
            sex: null,
            centuries: null,
            sort: null,
            order: null,
          }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
