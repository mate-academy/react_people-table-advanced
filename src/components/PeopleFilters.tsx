import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith, SearchParams } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';
const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function getToggledCenturies(ch: string): string[] | null {
    if (centuries.includes(ch)) {
      const newCenturies = centuries.filter(c => c !== ch);

      return newCenturies.length > 0 ? newCenturies : null;
    } else {
      return [...centuries, ch];
    }
  }

  function resetFiltersParams(): SearchParams {
    return {
      query: null,
      centuries: null,
      sex: null,
      sort: null,
      order: null,
    };
  }

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const params: SearchParams = value ? { query: value } : { query: null };

    setSearchParams(getSearchWith(searchParams, params));
  }

  return (
    <>
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
          <SearchLink
            data-cy="sexAll"
            className={cn('panel-tab', {
              'is-active': !searchParams.get('sex'),
            })}
            params={{ sex: null }}
          >
            All
          </SearchLink>
          <SearchLink
            data-cy="sexMale"
            className={cn('panel-tab', {
              'is-active': searchParams.get('sex') === 'm',
            })}
            params={{ sex: 'm' }}
          >
            Male
          </SearchLink>
          <SearchLink
            data-cy="sexFemale"
            className={cn('panel-tab', {
              'is-active': searchParams.get('sex') === 'f',
            })}
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
              onChange={handleSearchQueryChange}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>

        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {CENTURIES.map(century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={cn('button mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={{ centuries: getToggledCenturies(century) }}
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
            params={resetFiltersParams()}
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    </>
  );
};
