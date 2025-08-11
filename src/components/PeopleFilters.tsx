import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useMemo } from 'react';
import { SearchLink } from './SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCenturies = ['16', '17', '18', '19', '20'];
  const century = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';

  function toggleCentury(centuryProp: string) {
    const newCenturies = century.includes(centuryProp)
      ? century.filter(c => c !== centuryProp)
      : [...century, centuryProp];

    return newCenturies;
  }

  function handleNameFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (inputValue) {
      params.set('query', inputValue);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
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
                  'is-info': century.includes(currentCentury),
                })}
                params={{ centuries: toggleCentury(currentCentury) }}
              >
                {currentCentury}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': !!century.length,
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
