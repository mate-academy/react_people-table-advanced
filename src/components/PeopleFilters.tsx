import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useCallback } from 'react';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { Sex } from '../utils/constants';

const startedCenturies = ['16', '17', '18', '19', '20'];

export const PeopleFilters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sex = searchParams.get('sex') || '';
  const centuries = searchParams.getAll('centuries') || [];
  const query = searchParams.get('query') || '';

  const handlerCenturiesChange = useCallback((age: string) => {
    if (centuries.includes(age)) {
      return { centuries: centuries.filter(cent => cent !== age) || [] };
    }

    return { centuries: [...centuries, age] };
  }, [centuries]);

  const handlerQuery = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newParams = { query: event.target.value || null };

    setSearchParams(getSearchWith(searchParams, newParams));
  }, [searchParams]);

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
          params={{ sex: Sex.Man }}
          className={cn({ 'is-active': sex === Sex.Man })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: Sex.Feme }}
          className={cn({ 'is-active': sex === Sex.Feme })}
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
            onChange={handlerQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {startedCenturies.map(century => {
              const newParams = handlerCenturiesChange(century);

              return (
                <SearchLink
                  key={`${century}`}
                  data-cy="century"
                  className={cn('button', 'mr-1', {
                    'is-info': centuries.includes(century),
                  })}
                  params={newParams}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={cn(
                'button',
                'is-success',
                { 'is-outlined': centuries.length > 0 },
              )}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, centuries: null, query: null }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
