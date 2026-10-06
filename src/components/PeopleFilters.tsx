import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isActive = (paramInUrl: string): boolean => {
    return searchParams.has(paramInUrl);
  };

  const centuries = searchParams.getAll('centuries');
  const toggleCentury = (century: string) => {
    if (centuries.includes(century)) {
      return centuries.filter(item => item !== century);
    }

    return [...centuries, century];
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={!isActive('sex') ? 'is-active' : ''}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={searchParams.get('sex') === 'm' ? 'is-active' : ''}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={searchParams.get('sex') === 'f' ? 'is-active' : ''}
        >
          Female
        </SearchLink>
      </p>

      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            onChange={event => {
              setSearchParams(
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                }),
              );
            }}
            data-cy="NameFilter"
            type="search"
            className="input"
            placeholder="Search"
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {['16', '17', '18', '19', '20'].map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button mr-1', {
                  'is-info': searchParams.getAll('centuries').includes(century),
                })}
                params={{
                  centuries: toggleCentury(century),
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn('button is-success', {
                'is-outlined': isActive('centuries'),
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
          params={{
            centuries: null,
            query: null,
            sex: null,
          }}
          className={cn('button is-link is-fullwidth', {
            'is-outlined':
              !isActive('centuries') && !isActive('sex') && !isActive('query'),
          })}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
