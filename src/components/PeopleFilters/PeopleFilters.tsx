import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink params={{ sex: null }} className={!sex ? 'is-active' : ''}>
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
            onChange={onQueryChange}
            value={query}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                params={{
                  centuries: centuries.includes(century)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
                className={`button mr-1 ${centuries.includes(century) ? 'is-info' : ''}`}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: [] }}
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
          params={{ query: '', sex: '', centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
