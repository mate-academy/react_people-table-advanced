import classNames from 'classnames';
import { SearchLink } from './SearchLink';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../utils/searchHelper';

const centuryOptions = ['16', '17', '18', '19', '20'];

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredByQuery = searchParams.get('query') || '';
  const filteredBySex = searchParams.get('sex') || '';
  const filteredByCenturies = searchParams.getAll('centuries');
  const sortedBy = searchParams.get('sortedBy') || '';

  const handleChangingQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value.trim() ? event.target.value : null;
    const newSearchParam = getSearchWith(searchParams, { query: newQuery });

    setSearchParams(newSearchParam);
  };

  const handleTogglingCenturies = (addedCentury: string) => {
    return {
      centuries: filteredByCenturies.includes(addedCentury)
        ? [...filteredByCenturies].filter(century => century !== addedCentury)
        : [...filteredByCenturies, addedCentury],
    };
  };

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (!filteredByQuery) {
      newSearchParams.delete('query');
    }

    if (!filteredBySex) {
      newSearchParams.delete('sex');
    }

    if (!sortedBy) {
      newSearchParams.delete('sortedBy');
    }

    setSearchParams(newSearchParams);
  }, [filteredByQuery, filteredBySex, sortedBy, searchParams, setSearchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          className={classNames({ 'is-active': !filteredBySex })}
          params={{ sex: '' }}
        >
          All
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': filteredBySex === 'm' })}
          params={{ sex: 'm' }}
        >
          Male
        </SearchLink>

        <SearchLink
          className={classNames({ 'is-active': filteredBySex === 'f' })}
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
            value={filteredByQuery}
            onChange={handleChangingQuery}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {centuryOptions.map(century => (
              <SearchLink
                key={century}
                data-cy="century"
                className={classNames('button mr-1', {
                  'is-info': filteredByCenturies.includes(century),
                })}
                params={handleTogglingCenturies(century)}
              >
                {century}
              </SearchLink>
            ))}
          </div>

          <div className="level-right ml-4">
            <SearchLink
              data-cy="centuryALL"
              className={classNames('button is-success', {
                'is-outlined': filteredByCenturies.length,
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
          params={{
            query: '',
            sex: '',
            centuries: [],
          }}
        >
          Reset all filters
        </SearchLink>
      </div>
    </nav>
  );
};
