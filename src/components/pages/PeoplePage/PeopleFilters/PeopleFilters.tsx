import { useCallback } from 'react';
import classNames from 'classnames';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../SearchLink';
import { getSearchWith } from '../../../../utils/searchHelper';

const centuriesList = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCenturies = searchParams.getAll('centuries');
  const currentSex = searchParams.get('sex');
  const currentQuery = searchParams.get('query');

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value || null;
      const newSearchParams = getSearchWith(searchParams, { query: newQuery });

      setSearchParams(newSearchParams);
    }, [searchParams],
  );

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !currentSex })}
        >
          All
        </SearchLink>
        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': currentSex === 'm' })}
        >
          Male
        </SearchLink>
        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': currentSex === 'f' })}
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
            value={currentQuery || ''}
            onChange={handleInputChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuriesList.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                params={
                  {
                    centuries: currentCenturies.includes(century)
                      ? currentCenturies.filter(item => item !== century)
                      : [...currentCenturies, century],
                  }
                }
                className={classNames('button mr-1', {
                  'is-info': currentCenturies.includes(century),
                })}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              params={{ centuries: null }}
              data-cy="centuryALL"
              className={classNames(
                'button is-success',
                { 'is-outlined': currentCenturies.length },
              )}
            >
              All
            </SearchLink>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <SearchLink
          params={{ centuries: null, sex: null, query: null }}
          data-cy="centuryALL"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
