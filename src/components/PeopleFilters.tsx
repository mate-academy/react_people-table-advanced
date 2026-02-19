import classNames from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');
  const sex = searchParams.get('sex');
  const selectedCenturies = searchParams.getAll('centuries');
  const allCenturies = ['16', '17', '18', '19', '20'];

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !sex })}
          params={{ sex: null }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({ 'is-active': sex === 'f' })}
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
            value={query || ''}
            onChange={event => {
              const { value } = event.target;

              setSearchParams(
                getSearchWith(searchParams, {
                  query: value.trim() || null,
                }),
              );
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
            {allCenturies.map(century => {
              const isActive = selectedCenturies.includes(century);

              let newCenturies: string[] | null;

              if (isActive) {
                newCenturies = selectedCenturies.filter(
                  centuryActive => centuryActive !== century,
                );
              } else {
                newCenturies = [...selectedCenturies, century];
              }

              if (newCenturies.length === 0) {
                newCenturies = null;
              }

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames('button mr-1', { 'is-info': isActive })}
                  params={{ centuries: newCenturies }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>
          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success is-outlined', {
                'is-active': selectedCenturies.length === 0,
              })}
              params={{ centuries: null }}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <Link to="/people" className="button is-link is-outlined is-fullwidth">
          Reset all filters
        </Link>
      </div>
    </nav>
  );
};
