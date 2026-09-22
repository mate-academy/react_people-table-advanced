import { useSearchParams } from 'react-router-dom';

import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const selectedSex = searchParams.get('sex');

  const selectedCenturies = searchParams.getAll('centuries');

  const isCenturySelected = (century: string) => {
    return selectedCenturies.includes(century);
  };

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

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!selectedSex ? 'is-active' : ''}
          params={{ sex: null }}
        >
          All
        </SearchLink>

        <SearchLink
          className={selectedSex === 'm' ? 'is-active' : ''}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={selectedSex === 'f' ? 'is-active' : ''}
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
                className={`button mr-1 ${
                  isCenturySelected(century) ? 'is-info' : ''
                }`}
                params={{
                  centuries: isCenturySelected(century)
                    ? selectedCenturies.filter(item => item !== century)
                    : [...selectedCenturies, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{
                centuries: null,
              }}
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
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
