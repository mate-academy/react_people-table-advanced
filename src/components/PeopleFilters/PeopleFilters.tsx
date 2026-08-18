import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { SearchLink } from './../SearchLink';
import { getSearchWith, SearchParams } from './../../utils/searchHelper';
import { Filters } from '../../types';

export const usedCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get(Filters.Sex) || '';
  const query = searchParams.get(Filters.Query) || '';
  const centuries = searchParams.getAll(Filters.Centuries) || [];
  const isChosenCenturies = searchParams.has(Filters.Centuries);

  function setSearchWith(params: SearchParams) {
    const newSearch = getSearchWith(params, searchParams);

    setSearchParams(newSearch);
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value.trim();

    setSearchWith({ query: newQuery || null });
  }

  const upDatedCenturies = (century: string) => {
    return centuries.includes(century)
      ? centuries.filter(currentCentury => currentCentury !== century)
      : [...centuries, century];
  };

  console.log('render PeopleFilter');

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
            {usedCenturies.map(century => (
              <SearchLink
                data-cy="century"
                key={century}
                className={cn('button mr-1', {
                  'is-info': centuries.includes(century),
                })}
                params={{
                  centuries: upDatedCenturies(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', {
                'is-outlined': isChosenCenturies,
                'is-success': !isChosenCenturies,
              })}
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
          params={{ sex: null, query: null, centuries: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
