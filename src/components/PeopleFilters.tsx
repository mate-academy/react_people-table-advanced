import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({
      query: event.target.value.length !== 0 ? event.target.value : null,
    });
  }

  function genderChange(sex: string | null) {
    return { sex: sex };
  }

  function toggleCenturies(cent: string) {
    const newCenturies = centuries.includes(cent)
      ? centuries.filter(centurie => centurie !== cent)
      : [...centuries, cent];

    return { centuries: newCenturies };
  }

  function clearCenturies() {
    return { centuries: null };
  }

  function clearSeacrhParams() {
    return { sex: null, query: null, centuries: null };
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={!searchParams.has('sex') ? 'is-active' : ''}
          params={genderChange(null)}
        >
          All
        </SearchLink>
        <SearchLink
          className={searchParams.has('sex', 'm') ? 'is-active' : ''}
          params={genderChange('m')}
        >
          Male
        </SearchLink>
        <SearchLink
          className={searchParams.has('sex', 'f') ? 'is-active' : ''}
          params={genderChange('f')}
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
            {[16, 17, 18, 19, 20].map(cent => (
              <SearchLink
                key={cent}
                data-cy="century"
                className={`button mr-1 ${centuries.includes(cent.toString()) ? 'is-info' : ''}`}
                params={toggleCenturies(cent.toString())}
              >
                {cent}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={`button is-success ${searchParams.has('centuries') ? 'is-outlined' : ''}`}
              params={clearCenturies()}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={clearSeacrhParams()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
