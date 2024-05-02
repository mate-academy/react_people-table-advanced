import { useSearchParams } from 'react-router-dom';
import { SearchLink } from './SearchLink';
import { getSearchWith } from '../utils/searchHelper';
import classNames from 'classnames';
import { SexFilter } from '../types/enums';
import { CENTURIES } from '../types/consts';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentQuery = searchParams.get('query') || '';
  const currentSexFilter = searchParams.get('sex') || '';
  const currentCenturies = searchParams.getAll('centuries');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      getSearchWith(searchParams, {
        query: e.target.value === '' ? null : e.target.value,
      }),
    );
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {Object.entries(SexFilter).map(([key, value]) => {
          return (
            <SearchLink
              params={{ sex: value === '' ? null : value }}
              className={classNames({
                'is-active': currentSexFilter === value,
              })}
              key={key}
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
            value={currentQuery}
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
            {CENTURIES.map(century => {
              const toggleCentury = () => {
                if (currentCenturies.includes(century)) {
                  return currentCenturies.filter(cen => cen !== century);
                }

                return [...currentCenturies, century];
              };

              return (
                <SearchLink
                  params={{
                    centuries: toggleCentury(),
                  }}
                  className={classNames('button', 'mr-1', {
                    'is-info': currentCenturies.includes(century),
                  })}
                  key={century}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              params={{
                centuries: [],
              }}
              className={classNames('button', 'is-success', {
                'is-outlined': currentCenturies.length !== 0,
              })}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ sex: null, query: null, centuries: [] }}
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
