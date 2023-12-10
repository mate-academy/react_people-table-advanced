import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchParams, getSearchWith } from '../utils/searchHelper';
import { SearchLink } from './SearchLink';

const queryCentury = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || 'all';
  const query = searchParams.get('query') || '';
  const centuries = searchParams.getAll('centuries') || [];

  function clearFilters() {
    return ({
      centuries: null,
      sex: null,
      query: null,
    });
  }

  function setSearchWith(params: SearchParams) {
    const search: string = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
    searchParams.set('query', event.target.value);
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          data-cy="century"
          className={cn({ 'is-active': sex.includes('all') })}
          params={{
            sex: 'all',
          }}
        >
          All
        </SearchLink>

        <SearchLink
          data-cy="century"
          className={cn({ 'is-active': sex.includes('m') })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>

        <SearchLink
          data-cy="century"
          className={cn({ 'is-active': sex.includes('f') })}
          params={{
            sex: 'f',
          }}
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
            {queryCentury.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(`${century}`),
                })}
                params={{
                  centuries: centuries.includes(`${century}`)
                    ? centuries.filter(c => c !== century)
                    : [...centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                className={cn('button is-success', {
                  'is-outlined': centuries.length,
                })}
                params={{ centuries: null }}
              >
                All
              </SearchLink>
            </div>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          params={clearFilters()}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
