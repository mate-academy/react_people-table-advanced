import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './SearchLink';
import { SearchParams, getSearchWith } from '../utils/searchHelper';

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];

  const centuriesArr = ['16', '17', '18', '19', '20'];

  const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);

    if (event.target.value === '') {
      params.delete('query');
    }

    if (event.target.value) {
      params.set('query', event.target.value);
    }

    setSearchParams(params);
  };

  const setSearchWith = (params: SearchParams) => {
    setSearchParams(getSearchWith(searchParams, params));
  };

  const handleFilterByCenturies = (el: string) => {
    const updatedCenturies = centuries.includes(el)
      ? centuries.filter(century => century !== el)
      : [...centuries, el];

    setSearchWith({ centuries: updatedCenturies });
  };

  const resetAllFilters = {
    sex: null,
    centuries: [],
    query: null,
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={cn({ 'is-active': sex === '' })}
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
            onChange={handleFilterByName}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesArr.map(century => (
              <a
                href={`#/people?centuries=${century}`}
                onClick={event => {
                  event.preventDefault();
                  handleFilterByCenturies(century);
                }}
                className={cn(
                  'button',
                  'mr-1',
                  { 'is-info': centuries.includes(century) },
                )}
                key={century}
              >
                {century}
              </a>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{ centuries: [] }}
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={resetAllFilters}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
