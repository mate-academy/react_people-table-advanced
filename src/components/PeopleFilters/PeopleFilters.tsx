import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

const CENTURIES = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsMap = {
    sex: searchParams.get('sex') || '',
    query: searchParams.get('query') || '',
    century: searchParams.getAll('century') || [],
  };

  function setSearchWith(params: { [key: string]: string | null }) {
    const search = getSearchWith(searchParams, params);

    setSearchParams(search);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWith({ query: event.target.value || null });
  }

  function toggleCentury(century: string) {
    return searchParamsMap.century.includes(century)
      ? searchParamsMap.century.filter(c => c !== century)
      : [...searchParamsMap.century, century];
  }

  function resetAllFilters() {
    setSearchParams({});
  }

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': searchParamsMap.sex === '' })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParamsMap.sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': searchParamsMap.sex === 'f' })}
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
            value={searchParamsMap.query}
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
                key={century}
                params={{
                  century: toggleCentury(century),
                }}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': searchParamsMap.century.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': searchParamsMap.century.length === 0,
              })}
              params={{ century: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          className="button is-link is-outlined is-fullwidth"
          onClick={resetAllFilters}
          params={{ sex: null, century: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
