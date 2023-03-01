import classNames from 'classnames';
import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const currentSex = searchParams.get('sex');
  const currentCenturies = searchParams.getAll('centuries') || [];
  const filterCenturies = ['16', '17', '18', '19', '20'];

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value.trimStart() || null;

    const preparedSearchWith = getSearchWith(
      searchParams,
      {
        query: currentValue,
      },
    );

    setSearchParams(preparedSearchWith);
  };

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      <p className="panel-tabs" data-cy="SexFilter">
        {/* <a className="is-active" href="#/people">All</a> */}
        <SearchLink
          className={classNames({
            'is-active': currentSex === null,
          })}
          params={{
            sex: null,
          }}
        >
          All
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': currentSex === 'm',
          })}
          params={{
            sex: 'm',
          }}
        >
          Male
        </SearchLink>
        <SearchLink
          className={classNames({
            'is-active': currentSex === 'f',
          })}
          params={{
            sex: 'f',
          }}
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
            value={currentQuery}
            onChange={handleNameChange}
          />

          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden="true" />
          </span>
        </p>
      </div>

      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            {filterCenturies.map(century => {
              const isActive = currentCenturies.includes(century);

              return (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames(
                    'button mr-1',
                    { 'is-info': isActive },
                  )}
                  params={{
                    centuries: isActive
                      ? currentCenturies.filter(c => c !== century)
                      : [...currentCenturies, century],
                  }}
                >
                  {century}
                </SearchLink>
              );
            })}
          </div>

          <div className="level-right ml-4">
            <a
              data-cy="centuryALL"
              className="button is-success is-outlined"
              href="#/people"
            >
              All
            </a>
          </div>
        </div>
      </div>

      <div className="panel-block">
        <a
          className="button is-link is-outlined is-fullwidth"
          href="#/people"
        >
          Reset all filters
        </a>
      </div>
    </nav>
  );
};
