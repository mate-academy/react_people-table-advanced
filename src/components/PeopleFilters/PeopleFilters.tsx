import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';
import { useCallback } from 'react';

const sexParams = { All: null, Male: 'm', Female: 'f' };
const centuriesParams = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sexFilter = searchParams.get('sex') || null;
  const centuriesFilters = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const handleOnChange = useCallback(
    (text: string) => {
      const newParams = getSearchWith(searchParams, {
        query: text || null,
      });

      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(sexParams).map(([key, value]) => {
          const isSexFilterActive = value === sexFilter;

          return (
            <SearchLink
              key={key}
              className={cn({ 'is-active': isSexFilterActive })}
              params={{ sex: value }}
            >
              {key}
            </SearchLink>
          );
        })}
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
            value={query}
            onChange={event => handleOnChange(event.target.value)}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesParams.map(param => {
              const isCenturyFilterActive = centuriesFilters.includes(param);

              const updatedParams = isCenturyFilterActive
                ? centuriesFilters.filter(filter => filter != param)
                : [...centuriesFilters, param];

              return (
                <SearchLink
                  key={param}
                  data-cy="century"
                  className={cn('button', 'mr-1', {
                    'is-info': isCenturyFilterActive,
                  })}
                  params={{ centuries: updatedParams }}
                >
                  {param}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button', 'is-success', {
                'is-outlined': !!centuriesFilters.length,
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
          params={{ centuries: null, sex: null, query: null }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
