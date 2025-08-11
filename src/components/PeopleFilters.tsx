import cn from 'classnames';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';

const currentCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sex = searchParams.get('sex');
  const query = searchParams.get('query') || '';
  const centuries = useMemo(
    () => searchParams.getAll('centuries') || [],
    [searchParams],
  );

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (inputValue) {
      params.set('query', inputValue);
    } else {
      params.delete('query');
    }

    setSearchParams(params);
  }

  function toggleNumbers(num: string) {
    const newCenturies = centuries.includes(num)
      ? centuries.filter(c => c !== num)
      : [...centuries, num];

    return newCenturies;
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
          params={{ sex: 'm' }}
          className={cn({ 'is-active': sex === 'm' })}
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
            {currentCenturies.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{ centuries: toggleNumbers(century) }}
              >
                {century}
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
          params={{ sex: null, query: null, centuries: [] }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
