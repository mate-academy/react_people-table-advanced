import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [serchParams, setSerchParams] = useSearchParams();

  const query = serchParams.get('query') || '';
  const currentSex = serchParams.get('sex');
  const selectedCenturies = serchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextParams = new URLSearchParams(serchParams);
    const value = event.target.value;

    if (value) {
      nextParams.set('query', value);
    } else {
      nextParams.delete('query');
    }

    setSerchParams(nextParams);
  };

  const getToggleCenturyParams = (century: string) => {
    let newCenturies = [...selectedCenturies];

    if (newCenturies.includes(century)) {
      newCenturies = newCenturies.filter(c => c !== century);
    } else {
      newCenturies.push(century);
    }

    return { centuries: newCenturies.length > 0 ? newCenturies : null };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!currentSex ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={currentSex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={currentSex === 'f' ? 'is-active' : ''}
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
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={`button mr-1 ${selectedCenturies.includes(century)}`}
                params={getToggleCenturyParams(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success is-outlined ${selectedCenturies.length === 0 ? 'is-active' : ''}`}
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
