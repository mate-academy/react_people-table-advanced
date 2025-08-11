/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react';
import { Filter } from '../../enums/Filter';

import { SearchLink } from '../SearchLink';
import classNames from 'classnames';
import { PeopleContext } from '../../Context';

export const PeopleFilters = () => {
  // #region context

  const {
    activeCenturies,
    filter,
    sexParam,
    query,
    setFilter,
    queryHandler,
    centuriesHandler,
    resetHandler,
  } = useContext(PeopleContext);

  // #endregion
  // #region states

  // #endregion
  // #region values

  const sexValues: (string | null)[] = [null, 'm', 'f'];
  const filterValues = Object.values(Filter);

  // #endregion
  // #region useEffects

  useEffect(() => {
    sexValues.forEach((value, index) => {
      if (sexParam === value) {
        setFilter(filterValues[index]);
      }
    });
  }, [sexParam]);

  // #endregion
  // #region variables

  const centuries: string[] = Array.from({ length: 5 }, (_, i) => i + 16).map(
    num => num.toString(),
  );

  // #endregion

  // #endregion

  return (
    <nav className="panel">
      <p className="panel-heading">Filters</p>

      {/* sexFilter */}
      <>
        <p className="panel-tabs" data-cy="SexFilter">
          {filterValues.map((value, index) => (
            <SearchLink
              key={value}
              className={classNames({ 'is-active': filter === value })}
              params={{ sex: sexValues[index] }}
            >
              {value}
            </SearchLink>
          ))}
        </p>
      </>

      {/* queryFilter */}
      <>
        <div className="panel-block">
          <p className="control has-icons-left">
            <input
              data-cy="NameFilter"
              type="search"
              className="input"
              placeholder="Search"
              value={query}
              onChange={queryHandler}
            />

            <span className="icon is-left">
              <i className="fas fa-search" aria-hidden="true" />
            </span>
          </p>
        </div>
      </>

      {/* centuriesFilter */}
      <>
        <div className="panel-block">
          <div
            className="level is-flex-grow-1 is-mobile"
            data-cy="CenturyFilter"
          >
            <div className="level-left">
              {centuries.map(century => {
                return (
                  <a
                    key={century}
                    data-cy="century"
                    className={classNames('button', 'mr-1', {
                      'is-info': activeCenturies.includes(century),
                    })}
                    onClick={() => centuriesHandler(century)}
                  >
                    {century}
                  </a>
                );
              })}
            </div>

            <div className="level-right ml-4">
              <a
                data-cy="centuryALL"
                className={classNames('button', 'is-success', {
                  'is-outlined': activeCenturies.length > 0,
                })}
                onClick={() => centuriesHandler('')}
              >
                All
              </a>
            </div>
          </div>
        </div>
      </>

      {/* reset */}
      <>
        <div className="panel-block">
          <a
            className="button is-link is-outlined is-fullwidth"
            onClick={resetHandler}
          >
            Reset all filters
          </a>
        </div>
      </>
    </nav>
  );
};
