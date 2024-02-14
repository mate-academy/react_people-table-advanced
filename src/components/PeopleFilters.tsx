import { Link, useSearchParams } from 'react-router-dom';
import cn from 'classnames';
import { useContext, useEffect, useMemo } from 'react';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import { PeopleContext } from '../Context';

export const PeopleFilters = () => {
  const {
    filters,
    handleChangeFilter,
  } = useContext(PeopleContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';
  const sex = searchParams.get('sex') || '';
  const centuries = useMemo(() => {
    return searchParams.getAll('centuries') || [];
  }, [searchParams]);

  useEffect(() => {
    handleChangeFilter('query', query);
    handleChangeFilter('sex', sex);
    handleChangeFilter('centuries', centuries);
  }, [query, sex, centuries, handleChangeFilter]);

  const AVAILABLE_CENTURIES = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={cn({ 'is-active': !filters.sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': filters.sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={cn({ 'is-active': filters.sex === 'f' })}
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
            onChange={(event) => {
              setSearchParams((
                getSearchWith(searchParams, {
                  query: event.target.value || null,
                })
              ));
            }}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {AVAILABLE_CENTURIES.map((century) => (
              <SearchLink
                key={century}
                data-cy="century"
                className={cn('button', 'mr-1', {
                  'is-info': filters.centuries.includes(century),
                })}
                params={{
                  centuries: filters.centuries.includes(century)
                    ? filters.centuries.filter(c => c !== century)
                    : [...filters.centuries, century],
                }}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <Link
              data-cy="centuryALL"
              className="button is-success is-outlined"
              to="/people"
              onClick={() => { }}
            >
              All
            </Link>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link
          className="button is-link is-outlined is-fullwidth"
          to="#/people"
        >
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
