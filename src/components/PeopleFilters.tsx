import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSex = searchParams.get('sex') || '';
  const currentQuery = searchParams.get('query') || '';
  const currentCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const newParams = new URLSearchParams(searchParams);
    const trimmed = value.trim();

    if (trimmed) {
      newParams.set('query', trimmed);
    } else {
      newParams.delete('query');
    }

    setSearchParams(newParams);
  };

  const isCenturyActive = (century: string) => {
    return currentCenturies.includes(century);
  };

  const toggleCentury = (century: string) => {
    const newCenturies = isCenturyActive(century)
      ? currentCenturies.filter(c => c !== century)
      : [...currentCenturies, century];

    return { centuries: newCenturies.length > 0 ? newCenturies : null };
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={currentSex === '' ? 'is-active' : ''}
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
            value={currentQuery}
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
              className={`button mr-1 ${isCenturyActive('16') ? 'is-info' : ''}`}
              params={toggleCentury('16')}
            >
              16
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${isCenturyActive('17') ? 'is-info' : ''}`}
              params={toggleCentury('17')}
            >
              17
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${isCenturyActive('18') ? 'is-info' : ''}`}
              params={toggleCentury('18')}
            >
              18
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${isCenturyActive('19') ? 'is-info' : ''}`}
              params={toggleCentury('19')}
            >
              19
            </SearchLink>

            <SearchLink
              data-cy="century"
              className={`button mr-1 ${isCenturyActive('20') ? 'is-info' : ''}`}
              params={toggleCentury('20')}
            >
              20
            </SearchLink>
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
