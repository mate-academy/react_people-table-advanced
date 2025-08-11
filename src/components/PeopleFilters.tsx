import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith, SearchParams } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCenturies = ['16', '17', '18', '19', '20'];

  const query = searchParams.get('query') || '';

  const centuries = searchParams.getAll('centuries') || [];
  const sex = searchParams.get('sex') || '';

  function setSearchWith(params: SearchParams) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleNameFilter(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;

    setSearchWith({ query: newQuery || null });
  }

  function updateCenturies(ch: string, centuriesArray: string[]) {
    if (centuriesArray.includes(ch)) {
      return centuriesArray.filter(century => century !== ch);
    }

    return [...centuriesArray, ch];
  }

  function toggleCentury(ch: string) {
    const updatedCenturies = updateCenturies(ch, centuries);

    setSearchWith({ centuries: updatedCenturies });
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': !sex })}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={cn({ 'is-active': sex === 'f' })}
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
            onChange={handleNameFilter}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {currentCenturies.map(currentCentury => (
              <SearchLink
                data-cy="century"
                key={currentCentury}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(currentCentury),
                })}
                onClick={() => toggleCentury(currentCentury)}
                params={{
                  centuries: updateCenturies(currentCentury, centuries),
                }}
              >
                {currentCentury}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!centuries.length,
              })}
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
          params={{ query: null, sex: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
