import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextParams = new URLSearchParams(searchParams);
    const query = event.target.value;

    if (query) {
      nextParams.set('query', query);
    } else {
      nextParams.delete('query');
    }

    setSearchParams(nextParams, { replace: true });
  };

  const toggleCentury = (century: string) => {
    const nextCenturies = selectedCenturies.includes(century)
      ? selectedCenturies.filter(selected => selected !== century)
      : [...selectedCenturies, century];

    return nextCenturies.length > 0 ? nextCenturies : null;
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
            value={searchParams.get('query') || ''}
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
            {CENTURIES.map(century => (
              <SearchLink
                data-cy="century"
                className={`button mr-1 ${
                  selectedCenturies.includes(century) ? 'is-info' : ''
                }`}
                params={{ centuries: toggleCentury(century) }}
                key={century}
              >
                {century}
              </SearchLink>
            ))}
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
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={{
            query: null,
            sex: null,
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
