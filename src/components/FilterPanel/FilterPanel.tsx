import { NavLink, useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { useMemo } from 'react';
import { applyClassNames } from '../../utils/applyClassNames';
import { deleteClassName } from '../../utils/deleteClassName';
import { SearchLink } from '../SearchLink';

export const FilterPanel = () => {
  const [searchParams] = useSearchParams();

  const sex = useMemo(() => searchParams.get('sex'), [searchParams]);

  return (
    <nav className="panel">
      <p className="panel-heading">Filter</p>
      <p className="panel-tabs" data-cy="SexFilter">
        <SearchLink
          params={{ sex: null }}
          className={classNames({ 'is-active': !sex })}
        >
          All
        </SearchLink>

        <SearchLink
          params={{ sex: 'm' }}
          className={classNames({ 'is-active': sex === 'm' })}
        >
          Male
        </SearchLink>

        <SearchLink
          params={{ sex: 'f' }}
          className={classNames({ 'is-active': sex === 'f' })}
        >
          Female
        </SearchLink>
      </p>
      <div className="panel-block">
        <p className="control has-icons-left">
          <input
            type="text"
            placeholder="Search value"
            data-cy="NameFilter"
            className="input"
          />
          <span className="icon is-left">
            <i className="fas fa-search" aria-hidden />
          </span>
        </p>
      </div>
      <div className="panel-block">
        <div className="level is-flex-grow-1 is-mobile" data-cy="CenturyFilter">
          <div className="level-left">
            <NavLink
              to="people"
              data-cy="century"
              className={({ isActive }) => (
                applyClassNames(
                  isActive,
                  'is-info',
                  'button mr-1',
                )
              )}
            >
              16
            </NavLink>
            <NavLink
              to="people"
              data-cy="century"
              className={({ isActive }) => (
                applyClassNames(
                  isActive,
                  'is-info',
                  'button mr-1',
                )
              )}
            >
              17
            </NavLink>
            <NavLink
              to="people"
              data-cy="century"
              className={({ isActive }) => (
                applyClassNames(
                  isActive,
                  'is-info',
                  'button mr-1',
                )
              )}
            >
              18
            </NavLink>
            <NavLink
              to="people"
              data-cy="century"
              className={({ isActive }) => (
                applyClassNames(
                  isActive,
                  'is-info',
                  'button mr-1',
                )
              )}
            >
              19
            </NavLink>
            <NavLink
              to="people"
              data-cy="century"
              className={({ isActive }) => (
                applyClassNames(
                  isActive,
                  'is-info',
                  'button mr-1',
                )
              )}
            >
              20
            </NavLink>
          </div>
          <div className="level-right ml-4">
            <NavLink
              to="people"
              data-cy="centuryAll"
              className={({ isActive }) => (
                deleteClassName(
                  isActive,
                  'is-outlined',
                  'button is-success',
                )
              )}
            >
              All
            </NavLink>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <NavLink
          to="/people"
          className="button is-link is-outlined is-fullwidth"
        >
          Reset all filters
        </NavLink>
      </div>
    </nav>
  );
};
