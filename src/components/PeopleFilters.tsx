import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const centuries = searchParams.getAll('centuries');
  const query = searchParams.get('query') || '';

  const toggleCentury = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(item => item != century)
      : [...centuries, century];
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    params.set('query', event.target.value);

    setSearchParams(params);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink className="is-active" params={{ sex: null }}>
          All
        </SearchLink>
        <SearchLink className="is-active" params={{ sex: 'm' }}>
          Male
        </SearchLink>
        <SearchLink className="is-active" params={{ sex: 'f' }}>
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
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={{ centuries: toggleCentury('16') }}
            >
              16
            </SearchLink>
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={{ centuries: toggleCentury('17') }}
            >
              17
            </SearchLink>
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={{ centuries: toggleCentury('18') }}
            >
              18
            </SearchLink>
            <SearchLink
              data-cy="century"
              className="button mr-1"
              params={{ centuries: toggleCentury('19') }}
            >
              19
            </SearchLink>
            <SearchLink
              data-cy="century"
              className="button mr-1 is-info"
              params={{ centuries: toggleCentury('20') }}
            >
              20
            </SearchLink>
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className="button is-success is-outlined"
              params={{ centuries: [] }}
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
            centuries: [],
            query: null,
            sex: null,
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
