import classNames from 'classnames';
import React, { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchWith } from '../../utils/searchHelper';
import { SearchLink } from '../SearchLink';

export const PeopleFilters = React.memo(
  () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentQuery = searchParams.get('query') || '';
    const currentSex = searchParams.get('sex') || null;
    const currentCenturies = searchParams.getAll('centuries') || [];

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
      const currentValue = event.target.value.trimStart() || null;
      const preparesSearchWith = getSearchWith(
        searchParams,
        {
          query: currentValue,
        },
      );

      setSearchParams(preparesSearchWith);
    };

    return (
      <nav className="panel">
        <p className="panel-heading">Filters</p>

        <p className="panel-tabs" data-cy="SexFilter">
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
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {['16', '17', '18', '19', '20'].map(century => (
                <SearchLink
                  key={century}
                  data-cy="century"
                  className={classNames(
                    'button mr-1',
                    { 'is-info': currentCenturies.includes(century) },
                  )}
                  params={{
                    centuries: currentCenturies.includes(century)
                      ? currentCenturies.filter(c => c !== century)
                      : [...currentCenturies, century],
                  }}
                >
                  {century}
                </SearchLink>
              ))}
            </div>

            <div className="level-right ml-4">
              <SearchLink
                data-cy="centuryALL"
                className="button is-success is-outlined"
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
            params={{
              centuries: null,
              sex: null,
              query: null,
            }}
          >
            Reset all filters
          </SearchLink>
        </div>
      </nav>
    );
  },
);
